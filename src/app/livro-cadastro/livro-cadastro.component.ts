import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LivroService } from '../services/livro.service';
import { AutorService } from '../services/autor.service';
import { AssuntoService } from '../services/assunto.service';
import { Livro } from '../models/livro.model';
import { Autor } from '../models/autor.model';
import { Assunto } from '../models/assunto.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Component({
  selector: 'app-livro-cadastro',
  templateUrl: './livro-cadastro.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LivroCadastroComponent implements OnInit{
  livro: Livro = { titulo: '' };
  livros: Livro[] = [];
  autores: Autor[] = [];
  filteredAutores: Autor[] = [];
  autoresSelecionados: Autor[] = [];
  searchQuery = '';

  assuntos: Assunto[] = [];
  filteredAssuntos: Assunto[] = [];
  assuntosSelecionados: Assunto[] = [];
  searchQueryAssunto = '';

  totalElements: number = 0;
  totalPages: number = 0; 
  page: number = 0;
  size: number = 10;
  titulo: string = '';

  constructor(private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService
  ) {}

  ngOnInit() {
    this.carregarLivros();
    this.carregarAutores();
    this.carregarAssuntos();
  }

  onSubmit(form: NgForm) {
    this.livro.autoresIds = this.autoresSelecionados.map(a => a.id);
    this.livro.assuntosIds = this.assuntosSelecionados.map(a => a.id);
    console.log(this.livro);
    if (this.livro.titulo) {
      this.livroService.adicionarLivro(this.livro).subscribe({
        next: (value) => {
          alert('Livro salvo com sucesso!');
          this.resetForm(form);
          this.carregarLivros();
        },
        error: (error) => {
          alert('Erro ao salvar livro!');
        }
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.livro = { titulo: '' };
  }

  carregarLivros() {
    this.livroService.getLivros(this.titulo, this.page, this.size).subscribe((response: PaginatedResponse) => {
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

  carregarAutores() {
    this.autorService.getAll().subscribe((response: Autor[]) => {
      console.log(response);
      this.autores = response;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.filteredAutores = this.autores.filter((autor) =>
        autor.nome.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredAutores = [];
    }
  }

  selecionarAutor(autor: any): void {
    this.searchQuery = autor.nome;
    this.filteredAutores = [];
  }

  adicionarAutor(): void {
    const autor = this.autores.find(a => a.nome.toLowerCase() === this.searchQuery.toLowerCase());
    if (autor && !this.isAutorSelecionado(autor.nome)) {
      this.autoresSelecionados.push(autor);
    }
    this.searchQuery = '';
    this.filteredAutores = [];
  }

  isAutorSelecionado(nome: string): boolean {
    return this.autoresSelecionados.some(autor => autor.nome.toLowerCase() === nome.toLowerCase());
  }

  removerAutor(id: any): void {
    this.autoresSelecionados = this.autoresSelecionados.filter(
      (autor) => autor.id !== id
    );
  }

  carregarAssuntos() {
    this.assuntoService.getAll().subscribe((response: Assunto[]) => {
      this.assuntos = response;
    });
  }

  onSearchAssunto(): void {
    if (this.searchQueryAssunto.trim()) {
      this.filteredAssuntos = this.assuntos.filter((assunto) =>
        assunto.descricao && assunto.descricao.toLowerCase().includes(this.searchQueryAssunto.toLowerCase())
      );
    } else {
      this.filteredAssuntos = [];
    }
  }

  selecionarAssunto(assunto: any): void {
    this.searchQueryAssunto = assunto.descricao;
    this.filteredAssuntos = [];
  }

  adicionarAssunto(): void {
    const assunto = this.assuntos.find(a => a.descricao && a.descricao.toLowerCase() === this.searchQueryAssunto.toLowerCase());
    if (assunto && !this.isAutorSelecionado(assunto.descricao)) {
      this.assuntosSelecionados.push(assunto);
    }
    this.searchQueryAssunto = '';
    this.filteredAutores = [];
  }

  isAssuntoSelecionado(descricao: string): boolean {
    return this.assuntosSelecionados.some(assunto => assunto.descricao.toLowerCase() === descricao.toLowerCase());
  }

  removerAssunto(id: any): void {
    this.assuntosSelecionados = this.assuntosSelecionados.filter(
      (assunto) => assunto.id !== id
    );
  }
}
