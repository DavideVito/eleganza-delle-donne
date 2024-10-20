import { Scheduler } from "@aldabil/react-scheduler"
import AppuntamentiRepository from "../../Repositories/Appuntamenti/AppuntamentiRepository"
import { useContext } from "react"
import { Appuntamento } from "../../Models/Appuntamento/Appuntamento"
import { ProcessedEvent } from "@aldabil/react-scheduler/types"
import { it } from 'date-fns/locale';
import CreaAppuntamento from "../Crea/Appuntamento"
import { AppuntamentiContext } from "../../Contexts/Appuntamenti/AppuntamentiContext"


const convertEventi = (appuntamento: Appuntamento): ProcessedEvent => {
    return {
        event_id: appuntamento.id,
        title: appuntamento.cliente?.nomePersona ?? appuntamento.titolo,
        subtitle: appuntamento.sottotitolo,
        start: appuntamento.inizio,
        end: appuntamento.fine
    }
}

const traduzioni = {
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


export const Homepage = () => {

    const [appuntamenti, aggiornaAppuntamenti] = useContext(AppuntamentiContext)

    const onDelete = async (event: string) => {
        await AppuntamentiRepository.DeleteAppuntamento(event)
        aggiornaAppuntamenti()
    }


    if (!appuntamenti) return

    return <Scheduler

        locale={it}

        translations={traduzioni}

        view={"week"}

        onDelete={onDelete}

        loading={typeof appuntamenti === "undefined"}

        week={{
            weekDays: [1, 2, 3, 4, 5, 6],
            weekStartOn: 0,
            startHour: 8,
            endHour: 20,
            step: 30,
            navigation: true,
            disableGoToDay: false
        }}

        height={400}

        customEditor={(scheduler) => <CreaAppuntamento scheduler={scheduler} />}

        events={appuntamenti!.map(convertEventi)}
    />
}