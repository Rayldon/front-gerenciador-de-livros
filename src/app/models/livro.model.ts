import { Autor } from './autor.model';
import { Assunto } from './assunto.model';

export interface Livro {
    id?: number;
    titulo: string;
    editora?: string;
    edicao?: number;
    anoPublicacao?: string;
    autores?: Autor[];
    assuntos?: Assunto[];
}