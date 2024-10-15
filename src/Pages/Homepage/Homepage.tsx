import { Scheduler } from "@aldabil/react-scheduler"
import AppuntamentiRepository from "../../Repositories/Appuntamenti/AppuntamentiRepository"
import { useEffect, useState } from "react"
import { Appuntamento, CreaAppuntamentoModel } from "../../Models/Appuntamento/Appuntamento"
import { EventActions, ProcessedEvent } from "@aldabil/react-scheduler/types"
import { it } from 'date-fns/locale';


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

        console.log(action)

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

        locale={it}

        translations={
            {
                navigation: {
                    month: "Mese",
                    week: "Settimana",
                    day: "Giorno",
                    today: "Oggi",
                    agenda: "Agenda"
                },
                form: {
                    addTitle: "Aggiunti appuntamento",
                    editTitle: "Modifica appuntamento",
                    confirm: "Conferma",
                    delete: "Elimina",
                    cancel: "Annulla"
                },
                event: {
                    title: "Titolo",
                    subtitle: "Descrizione",
                    start: "Inizio",
                    end: "Fine",
                    allDay: "Tutto il giorno"
                },
                validation: {
                    required: "Richiesto",
                    invalidEmail: "Email non valida",
                    onlyNumbers: "Solo numeri accettati",
                    min: "Inserisci almeno {{min}} lettere",
                    max: "Inserisci al massimo {{max}} lettere"
                },
                moreEvents: "Di più...",
                noDataToDisplay: "Nessun elemento da mostrare",
                loading: "Carico..."
            }
        }

        view={"week"}

        onConfirm={onConfirm}
        onDelete={onDelete}

        loading={typeof appuntamenti === "undefined"}

        week={{
            weekDays: [1, 2, 3, 4, 5, 6],
            weekStartOn: 0,
            startHour: 8,
            endHour: 19,
            step: 60,
            navigation: true,
            disableGoToDay: false
        }}

        height={400}

        events={appuntamenti!.map(convertEventi)}
    />
}