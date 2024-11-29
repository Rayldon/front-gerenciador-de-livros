import { Routes } from '@angular/router';
import { AutorCadastroComponent } from './autor-cadastro/autor-cadastro.component';

export const routes: Routes = [
    { path: 'cadastro-autor', component: AutorCadastroComponent },
    { path: '', redirectTo: '/cadastro-autor', pathMatch: 'full' },
  ];
