export interface Livro {
    id?: number;
    titulo: string;
    editora?: string;
    edicao?: number;
    anoPublicacao?: string;
    autoresIds?: any;
    assuntosIds?: any;
}