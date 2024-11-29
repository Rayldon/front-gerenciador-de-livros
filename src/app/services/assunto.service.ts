import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Assunto } from '../models/assunto.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  adicionarAssunto(assunto: Assunto): Observable<Object> {
    return this.http.post<any>(`${this.apiUrl}/api/assunto`, assunto);
  }

  getAssuntos(nome: string = '', page: number = 0, size: number = 10): Observable<PaginatedResponse> {
    const params = new HttpParams()
      .set('nome', nome)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse>(`${this.apiUrl}/api/assunto`, { params });
  }

  excluirAssunto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/assunto/${id}`);
  }

  getAll(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`${this.apiUrl}/api/assunto/todos`);
  }
}
