import { Autor } from './autor.model';
import { Assunto } from './assunto.model';

export interface LivroDTO {
    id?: number;
    titulo: string;
    editora?: string;
    edicao?: number;
    anoPublicacao?: string;
    valor?: number;
    autoresIds?: number[];
    assuntosIds?: number[];
}