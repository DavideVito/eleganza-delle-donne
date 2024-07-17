import { useEffect, useState } from "react"
import ClientiRepository from "../../Repositories/Clienti/ClientiRepository";
import { Cliente } from "../../Models/Cliente/Cliente";

const LinkCreazione = () => <a href="/crea-cliente">Clicca qui per creare un nuovo cliente</a>


export const Homepage = () => {

    const [clienti, setClienti] = useState<Cliente[] | undefined>();

    useEffect(() => { ClientiRepository.GetClienti().then(setClienti) }, [])


    if (!clienti) return "Carico"

    if (clienti.length === 0) return <>
        Nessun cliente trovato
        <LinkCreazione />
    </>

    return <div>
        Clienti:


        {
            clienti.map(cliente => {

                return <div> <a href={`/info-cliente/${cliente.id}`} key={cliente.id}>
                    Nome: {cliente.nomePersona}
                </a>
                </div>
            })
        }
    </div>

}

