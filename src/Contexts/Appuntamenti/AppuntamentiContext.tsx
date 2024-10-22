import { createContext, useState } from "react";
import { Appuntamento } from "../../Models/Appuntamento/Appuntamento";
import AppuntamentiRepository from "../../Repositories/Appuntamenti/AppuntamentiRepository";

export const AppuntamentiContext = createContext<[Appuntamento[] | undefined, (inizio?: Date, fine?: Date) => void]>([[], () => { }])

export const AppuntamentiContextProvider = (props: React.PropsWithChildren) => {

    const [appuntamenti, setAppuntamenti] = useState<Appuntamento[] | undefined>()

    const aggiornaAppuntamenti = (inizio?: Date, fine?: Date) => { AppuntamentiRepository.GetAppuntamenti(inizio, fine).then(setAppuntamenti) }

    return <AppuntamentiContext.Provider value={[appuntamenti, aggiornaAppuntamenti]}>
        {
            props.children
        }
    </AppuntamentiContext.Provider>

}