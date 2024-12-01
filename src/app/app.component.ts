import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { environment } from './../enviroments/enviroment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gerenciador-livro';

  apiUrl = environment.apiUrl;
}
