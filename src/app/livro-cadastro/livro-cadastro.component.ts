import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LivroService } from '../services/livro.service';
import { AutorService } from '../services/autor.service';
import { AssuntoService } from '../services/assunto.service';
import { LivroDTO } from '../models/livro.dto';
import { Livro } from '../models/livro.model';
import { Autor } from '../models/autor.model';
import { AutoCompleteDTO } from '../models/auto-complete.dto';
import { Assunto } from '../models/assunto.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Component({
  selector: 'app-livro-cadastro',
  templateUrl: './livro-cadastro.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [CurrencyPipe]
})
export class LivroCadastroComponent implements OnInit{
  livro: LivroDTO = { titulo: '' };
  livros: Livro[] = [];

  autores: AutoCompleteDTO[] = [];
  autoresSelecionados: AutoCompleteDTO[] = [];
  searchQuery: string = '';

  assuntos: AutoCompleteDTO[] = [];
  assuntosSelecionados: AutoCompleteDTO[] = [];
  searchQueryAssunto: string = '';

  totalElements: number = 0;
  totalPages: number = 0; 
  page: number = 0;
  size: number = 10;
  titulo: string = '';

  constructor(private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.carregarLivros();
  }

  onSubmit(form: NgForm) {
    this.livro.autoresIds = this.autoresSelecionados.map(a => a.id).filter((id): id is number => id !== undefined);
    this.livro.assuntosIds = this.assuntosSelecionados.map(a => a.id).filter((id): id is number => id !== undefined);

    if (this.livro.titulo) {
      this.livroService.adicionarLivro(this.livro).subscribe({
        next: (value) => {
          alert('Livro salvo com sucesso!');
          this.resetForm(form);
          this.carregarLivros();
        },
        error: (error) => {
          alert(error.error);
        }
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.livro = { titulo: '' };
    this.assuntosSelecionados = [];
    this.autoresSelecionados = [];
  }

  carregarLivros() {
    this.livroService.getLivros(this.titulo, this.page, this.size).subscribe((response: PaginatedResponse) => {
      console.log(response.content)
      this.livros = response.content;
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  onPageChange(event: number) {
    this.page = event;
    this.carregarLivros();
  }

  buscarPorTitulo() {
    this.page = 0;
    this.carregarLivros();
  }

  editarLivro(livro?: Livro) {
    if(livro){
      this.livro = { ...livro };
      livro.autores?.forEach(a => this.autoresSelecionados.push({id: a.id, descricao: a.nome}));
      livro.assuntos?.forEach(a => this.assuntosSelecionados.push({id: a.id, descricao: a.descricao}));
    }
  }

  excluirLivro(id?: number) {
    console.log('Excluindo livro com ID:', id);
    if (id && confirm('Tem certeza que deseja excluir este livro?')) {
      this.livroService.excluirLivro(id).subscribe({
        next: (value) => {
          alert('Livro excluído com sucesso!');
          this.carregarLivros();
        },
        error: (error) => {
          alert('Erro ao excluir livro!');
        }
      });
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.autores = [];
      return;
    }
    this.autorService.autocomplete(this.searchQuery).subscribe((data) => {
      this.autores = data;
    });
  }

  selecionarAutor(autor: AutoCompleteDTO): void {
    if (autor && !this.isAutorSelecionado(autor.descricao)) {
      this.autoresSelecionados.push(autor);
    }
    this.searchQuery = '';
    this.autores = [];
  }

  isAutorSelecionado(nome?: string): boolean {
    return this.autoresSelecionados.some(autor => autor.descricao?.toLowerCase() === nome?.toLowerCase());
  }

  removerAutor(id?: number): void {
    this.autoresSelecionados = this.autoresSelecionados.filter(
      (autor) => autor.id !== id
    );
  }

  onSearchAssunto(): void {
    if (this.searchQueryAssunto.trim() === '') {
      this.assuntos = [];
      return;
    }
    this.assuntoService.autocomplete(this.searchQueryAssunto).subscribe((data) => {
      this.assuntos = data;
    });
  }

  selecionarAssunto(assunto: AutoCompleteDTO): void {
    if (assunto && !this.isAssuntoSelecionado(assunto.descricao)) {
      this.assuntosSelecionados.push(assunto);
    }
    this.searchQueryAssunto = '';
    this.assuntos = [];
  }

  isAssuntoSelecionado(descricao?: string): boolean {
    return this.assuntosSelecionados.some(assunto => assunto.descricao?.toLowerCase() === descricao?.toLowerCase());
  }

  removerAssunto(id?: number): void {
    this.assuntosSelecionados = this.assuntosSelecionados.filter(
      (assunto) => assunto.id !== id
    );
  }

  formatCurrency() {
    return this.currencyPipe.transform(this.livro.valor, 'BRL', 'symbol', '1.2-2');
  }

  onValueChange(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    this.livro.valor = parseInt(value, 10) / 100;
  }

  allowNumbersOnly(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
