import { createContext, useEffect, useState } from "react";
import { Cliente } from "../../Models/Cliente/Cliente";
import ClientiRepository from "../../Repositories/Clienti/ClientiRepository";

export const ClienteContext = createContext<Cliente[] | undefined>(undefined)

export const ClienteContextProvider = (props: React.PropsWithChildren) => {

    const [clienti, setClienti] = useState<Cliente[] | undefined>()

    useEffect(() => {
        ClientiRepository.GetClienti().then(setClienti)
    }, [])

    return <ClienteContext.Provider value={clienti}>
        {
            props.children
        }
    </ClienteContext.Provider>

}