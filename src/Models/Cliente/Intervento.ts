import { Cliente } from "./Cliente"

export interface Intervento {

    id: string,
    data: Date,
    descrizione: string
}

export interface CreaInterventoModel {
    cliente: Cliente
    data: Date,
    descrizione: string
}