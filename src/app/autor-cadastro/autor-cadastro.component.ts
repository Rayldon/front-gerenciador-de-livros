import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutorService } from './../services/autor.service';
import { Autor } from './../models/autor.model';
import { PaginatedResponse } from './../models/paginated-response.model';

@Component({
  selector: 'app-autor-cadastro',
  templateUrl: './autor-cadastro.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AutorCadastroComponent implements OnInit{
  autor: Autor = { nome: '' };
  autores: Autor[] = [];
  totalElements: number = 0;
  totalPages: number = 0; 
  page: number = 0;
  size: number = 10;
  nome: string = '';

  constructor(private autorService: AutorService) {}

  ngOnInit() {
    this.carregarAutores();
  }

  onSubmit(form: NgForm) {
    if (this.autor.nome) {
      this.autorService.adicionarAutor(this.autor).subscribe({
        next: (value) => {
          alert('Autor salvo com sucesso!');
          this.resetForm(form);
          this.carregarAutores();
        },
        error: (error) => {
          alert('Erro ao salvar autor!');
        }
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.autor = { nome: '' };
  }

  carregarAutores() {
    this.autorService.getAutores(this.nome, this.page, this.size).subscribe((response: PaginatedResponse) => {
      this.autores = response.content;
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  onPageChange(event: number) {
    this.page = event;
    this.carregarAutores();
  }

  buscarPorNome() {
    this.page = 0;
    this.carregarAutores();
  }

  editarAutor(autor?: Autor) {
    if(autor){
      this.autor = { ...autor };
    }
  }

  excluirAutor(id?: number) {
    console.log('Excluindo autor com ID:', id);
    if (id && confirm('Tem certeza que deseja excluir este autor?')) {
      this.autorService.excluirAutor(id).subscribe({
        next: (value) => {
          alert('Autor excluído com sucesso!');
          this.carregarAutores();
        },
        error: (error) => {
          alert('Erro ao excluir autor!');
        }
      });
    }
  }
}
