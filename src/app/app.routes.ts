import { Routes } from '@angular/router';
import { AutorCadastroComponent } from './autor-cadastro/autor-cadastro.component';
import { AssuntoCadastroComponent } from './assunto-cadastro/assunto-cadastro.component';

export const routes: Routes = [
    { path: 'cadastro-autor', component: AutorCadastroComponent },
    { path: 'cadastro-assunto', component: AssuntoCadastroComponent },
    { path: '', redirectTo: '/cadastro-autor', pathMatch: 'full' },
  ];
