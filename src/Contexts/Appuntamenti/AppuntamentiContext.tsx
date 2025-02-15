import { createContext, useState } from "react";
import { Appuntamento } from "../../Models/Appuntamento/Appuntamento";
import AppuntamentiRepository from "../../Repositories/Appuntamenti/AppuntamentiRepository";
import { endOfWeek, startOfWeek, StartOfWeekOptions } from "date-fns";

export const INTERVAL_OPTIONS: StartOfWeekOptions<Date> = { weekStartsOn: 1 }

export const getInterval = (data?: Date) => [startOfWeek(data ?? new Date(), INTERVAL_OPTIONS), endOfWeek(data ?? new Date())]


export const AppuntamentiContext = createContext<[Appuntamento[] | undefined, (inizio?: Date, fine?: Date) => void]>([[], () => { }])

export const AppuntamentiContextProvider = (props: React.PropsWithChildren) => {

    const [appuntamenti, setAppuntamenti] = useState<Appuntamento[] | undefined>()

    const aggiornaAppuntamenti = (inizio?: Date, fine?: Date) => { AppuntamentiRepository.GetAppuntamenti(inizio ?? new Date(), fine ?? new Date()).then(setAppuntamenti) }

    return <AppuntamentiContext.Provider value={[appuntamenti, aggiornaAppuntamenti]}>
        {
            props.children
        }
    </AppuntamentiContext.Provider>

}