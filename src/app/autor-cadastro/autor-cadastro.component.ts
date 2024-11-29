import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutorService } from './../services/autor.service';
import { Autor } from './../models/autor.model';

@Component({
  selector: 'app-autor-cadastro',
  templateUrl: './autor-cadastro.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AutorCadastroComponent {
  autor: Autor = { nome: '' };

  constructor(private autorService: AutorService) {}

  onSubmit() {
    if (this.autor.nome) {
      this.autorService.adicionarAutor(this.autor).subscribe({
        next: (value) => {
          alert('Autor salvo com sucesso!');
          this.autor = { nome: '' };
        },
        error: (error) => {
          alert('Erro ao salvar autor!');
        },
        complete: () => {
          console.log('Complete!');
        }
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.autor = { nome: '' };
  }
}
