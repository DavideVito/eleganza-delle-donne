export interface Appuntamento {

    id: string,
    titolo: string,
    sottotitolo: string,
    inizio: Date,
    fine: Date
}

export interface CreaAppuntamentoModel {
    id?: string,
    titolo: string,
    sottotitolo: string,
    inizio: Date,
    fine: Date
}
