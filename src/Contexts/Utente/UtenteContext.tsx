import { createContext, useEffect, useState } from "react";


export const UtenteContext = createContext<[boolean, () => void]>([false, () => { }])

export const UtenteContextProvider = (props: React.PropsWithChildren) => {

    const [isLoggato, setIsLoggato] = useState<boolean>(false)

    useEffect(() => {

        const item = sessionStorage.getItem("loggato")

        if (item === "true") {
            return setIsLoggato(true)
        }

        setIsLoggato(false)
    }, [isLoggato])

    const setLoggato = () => {
        sessionStorage.setItem("loggato", "true");
        setIsLoggato(true)
    }

    return <UtenteContext.Provider value={[isLoggato, setLoggato]} >
        {
            props.children
        }
    </UtenteContext.Provider >

}