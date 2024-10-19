import { Cliente } from "../Cliente/Cliente"

export interface Appuntamento {

    id: string,
    titolo: string,
    sottotitolo: string,

    cliente: Cliente,
    inizio: Date,
    fine: Date
}

export interface CreaAppuntamentoModel {
    id?: string,

    cliente: Cliente,

    titolo?: string,
    sottotitolo: string,

    inizio: Date,
    fine: Date
}
