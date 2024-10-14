import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Cliente } from "../../../../Models/Cliente/Cliente"
import ClientiRepository from "../../../../Repositories/Clienti/ClientiRepository"

export const InfoCliente = () => {

    const { id } = useParams()

    const [cliente, setCliente] = useState<Cliente | undefined | null>()

    useEffect(() => { ClientiRepository.GetCliente(id!).then(setCliente) }, [])

    if (typeof cliente === "undefined") return "Carico..."
    if (!cliente) return "Cliente non trovato"


    return <div>
        Cliente: {cliente.nomePersona}
    </div>


}
