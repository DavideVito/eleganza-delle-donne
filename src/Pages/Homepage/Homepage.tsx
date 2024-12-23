import { Scheduler } from "@aldabil/react-scheduler"
import AppuntamentiRepository from "../../Repositories/Appuntamenti/AppuntamentiRepository"
import { useContext, useEffect, useRef } from "react"
import { Appuntamento } from "../../Models/Appuntamento/Appuntamento"
import { ProcessedEvent, SchedulerRef } from "@aldabil/react-scheduler/types"
import { it } from 'date-fns/locale';
import CreaAppuntamento from "../Crea/Appuntamento"
import { AppuntamentiContext } from "../../Contexts/Appuntamenti/AppuntamentiContext"
import { Loading } from "../../Components/Loading/Loading"
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns"


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

    const ref = useRef<SchedulerRef>(null);

    const [appuntamenti, aggiornaAppuntamenti] = useContext(AppuntamentiContext)

    const onDelete = async (event: string) => {
        await AppuntamentiRepository.DeleteAppuntamento(event)
        aggiornaAppuntamenti()
    }

    useEffect(() => {
        aggiornaAppuntamenti(startOfWeek(new Date()), endOfWeek(new Date()))
    }, [])

    const onSelectedDateChange = (date: Date) => {
        let start, end: Date;
        const view = ref.current?.scheduler.view

        if (view === "week") {
            start = startOfWeek(date);
            end = endOfWeek(date);
        } else if (view === "month") {
            start = startOfMonth(date);
            end = endOfMonth(date);
        } else {
            start = date;
            end = date;
        }

        aggiornaAppuntamenti(start, end)
    }


    if (!appuntamenti) return

    return <Scheduler

        hourFormat="24"
        timeZone="Europe/Rome"
        ref={ref}
        locale={it}
        view={"week"}
        week={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 1,
            startHour: 8,
            endHour: 20,
            step: 30,
            navigation: true,
            disableGoToDay: false
        }}

        onSelectedDateChange={onSelectedDateChange}
        onDelete={onDelete}

        translations={traduzioni}

        loading={typeof appuntamenti === "undefined"}
        loadingComponent={<Loading />}

        height={400}
        customEditor={(scheduler) => <CreaAppuntamento scheduler={scheduler} />}

        events={appuntamenti!.map(convertEventi)}
    />
}