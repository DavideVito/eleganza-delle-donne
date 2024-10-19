import { createContext, useEffect, useState } from "react";
import { Appuntamento } from "../../Models/Appuntamento/Appuntamento";
import AppuntamentiRepository from "../../Repositories/Appuntamenti/AppuntamentiRepository";

export const AppuntamentiContext = createContext<[Appuntamento[] | undefined, () => void]>([[], () => { }])

export const AppuntamentiContextProvider = (props: React.PropsWithChildren) => {

    const [appuntamenti, setAppuntamenti] = useState<Appuntamento[] | undefined>()

    const aggiornaAppuntamenti = () => { AppuntamentiRepository.GetAppuntamenti().then(setAppuntamenti) }

    useEffect(() => {
        aggiornaAppuntamenti()
    }, [])

    return <AppuntamentiContext.Provider value={[appuntamenti, aggiornaAppuntamenti]}>
        {
            props.children
        }
    </AppuntamentiContext.Provider>

}