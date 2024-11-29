import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Autor } from './../models/autor.model';
import { PaginatedResponse } from './../models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  adicionarAutor(autor: Autor): Observable<Object> {
    return this.http.post<any>(`${this.apiUrl}/api/autor`, autor);
  }

  getAutores(nome: string = '', page: number = 0, size: number = 10): Observable<PaginatedResponse> {
    const params = new HttpParams()
      .set('nome', nome)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse>(`${this.apiUrl}/api/autor`, { params });
  }

  excluirAutor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/autor/${id}`);
  }
}
