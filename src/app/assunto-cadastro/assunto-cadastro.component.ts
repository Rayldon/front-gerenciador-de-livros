import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssuntoService } from '../services/assunto.service';
import { Assunto } from '../models/assunto.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Component({
  selector: 'app-assunto-cadastro',
  templateUrl: './assunto-cadastro.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AssuntoCadastroComponent implements OnInit{
  assunto: Assunto = { descricao: '' };
  assuntos: Assunto[] = [];
  totalElements: number = 0;
  totalPages: number = 0; 
  page: number = 0;
  size: number = 10;
  descricao: string = '';

  constructor(private assuntoService: AssuntoService) {}

  ngOnInit() {
    this.carregarAssuntos();
  }

  onSubmit(form: NgForm) {
    if (this.assunto.descricao) {
      this.assuntoService.adicionarAssunto(this.assunto).subscribe({
        next: (value) => {
          alert('Assunto salvo com sucesso!');
          this.resetForm(form);
          this.carregarAssuntos();
        },
        error: (error) => {
          alert('Erro ao salvar assunto!');
        }
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.assunto = { descricao: '' };
  }

  carregarAssuntos() {
    this.assuntoService.getAssuntos(this.descricao, this.page, this.size).subscribe((response: PaginatedResponse) => {
      this.assuntos = response.content;
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  onPageChange(event: number) {
    this.page = event;
    this.carregarAssuntos();
  }

  buscarPorDescricao() {
    this.page = 0;
    this.carregarAssuntos();
  }

  editarAssunto(assunto?: Assunto) {
    if(assunto){
      this.assunto = { ...assunto };
    }
  }

  excluirAssunto(id?: number) {
    console.log('Excluindo assunto com ID:', id);
    if (id && confirm('Tem certeza que deseja excluir este assunto?')) {
      this.assuntoService.excluirAssunto(id).subscribe({
        next: (value) => {
          alert('Assunto excluído com sucesso!');
          this.carregarAssuntos();
        },
        error: (error) => {
          alert('Erro ao excluir assunto!');
        }
      });
    }
  }
}
