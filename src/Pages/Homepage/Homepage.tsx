import { Scheduler } from "@aldabil/react-scheduler"
import AppuntamentiRepository from "../../Repositories/Appuntamenti/AppuntamentiRepository"
import { useEffect, useState } from "react"
import { Appuntamento, CreaAppuntamentoModel } from "../../Models/Appuntamento/Appuntamento"
import { EventActions, ProcessedEvent } from "@aldabil/react-scheduler/types"


const convertEventi = (appuntamento: Appuntamento): ProcessedEvent => {
    return {
        event_id: appuntamento.id,
        title: appuntamento.titolo,
        subtitle: appuntamento.sottotitolo,
        start: appuntamento.inizio,
        end: appuntamento.fine
    }
}


export const Homepage = () => {


    const onConfirm = async (event: ProcessedEvent, action: EventActions) => {

        const dto: CreaAppuntamentoModel = {
            id: event.event_id?.toString(),
            fine: event.end,
            inizio: event.start,
            //@ts-ignore
            sottotitolo: event.subtitle,

            //@ts-ignore
            titolo: event.title
        }

        await AppuntamentiRepository.CreaAppuntamento(dto)
        return event
    }

    const onDelete = async (event: string) => {
        await AppuntamentiRepository.DeleteAppuntamento(event)
        getAppuntamenti()
    }

    const getAppuntamenti = () => { AppuntamentiRepository.GetAppuntamenti().then(setAppuntamenti) }

    const [appuntamenti, setAppuntamenti] = useState<Appuntamento[] | undefined>(undefined);

    useEffect(getAppuntamenti, [])

    if (!appuntamenti) return

    return <Scheduler
        view="month"


        onConfirm={onConfirm}
        onDelete={onDelete}


        events={appuntamenti!.map(convertEventi)}
    />
}