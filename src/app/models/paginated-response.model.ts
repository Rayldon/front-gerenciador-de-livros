import { Autor } from './autor.model';

export interface PaginatedResponse {
  content: Autor[];
  totalElements: number;
  totalPages: number;
  number: number;
}