import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Autor } from './../models/autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  adicionarAutor(autor: Autor): Observable<Object> {
    return this.http.post<any>(`${this.apiUrl}/api/autor`, autor);
  }
}
