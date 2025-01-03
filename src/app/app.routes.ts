import { Routes } from '@angular/router';
import { AutorCadastroComponent } from './autor-cadastro/autor-cadastro.component';
import { AssuntoCadastroComponent } from './assunto-cadastro/assunto-cadastro.component';
import { LivroCadastroComponent } from './livro-cadastro/livro-cadastro.component';

export const routes: Routes = [
    { path: 'cadastro-livro', component: LivroCadastroComponent },
    { path: 'cadastro-autor', component: AutorCadastroComponent },
    { path: 'cadastro-assunto', component: AssuntoCadastroComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' },
  ];
