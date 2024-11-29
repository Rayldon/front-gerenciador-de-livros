import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  adicionarLivro(livro: Livro): Observable<Object> {
    return this.http.post<any>(`${this.apiUrl}/api/livro`, livro);
  }

  getLivros(nome: string = '', page: number = 0, size: number = 10): Observable<PaginatedResponse> {
    const params = new HttpParams()
      .set('nome', nome)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse>(`${this.apiUrl}/api/livro`, { params });
  }

  excluirLivro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/livro/${id}`);
  }
}
