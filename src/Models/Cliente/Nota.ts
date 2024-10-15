import { Cliente } from "./Cliente"

export interface Nota {

    id: string,
    data: Date,
    descrizione: string
}

export interface CreaNotaModel {
    cliente: Cliente
    data: Date,
    descrizione: string
}