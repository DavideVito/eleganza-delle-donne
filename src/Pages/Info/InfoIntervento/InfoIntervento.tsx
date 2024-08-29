import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Intervento } from "../../../Models/Cliente/Intervento"
import InterventiRepository from "../../../Repositories/Interventi/InterventiRepository"
import { Typography } from "@mui/material"
import 'react-slideshow-image/dist/styles.css'
import { formatDate } from "../../../Utils/Functions"
import { ImageUploader } from "./Components/ImageUploader"
import { ImageViewer } from "./Components/ImageViewer"
import { Cliente } from "../../../Models/Cliente/Cliente"
import ClientiRepository from "../../../Repositories/Clienti/ClientiRepository"

export const InfoIntervento = () => {

    const { idcliente, id } = useParams()

    const [intervento, setIntervento] = useState<Intervento | null | undefined>(undefined)
    const [cliente, setCliente] = useState<Cliente | null | undefined>(undefined)
    const [urls, setUrls] = useState<string[] | undefined>();

    const getFiles = () => InterventiRepository.GetFiles(id!).then(setUrls);

    useEffect(() => {
        InterventiRepository.GetIntervento(idcliente!, id!).then(setIntervento)
        ClientiRepository.GetCliente(idcliente!).then(setCliente)
        getFiles()
    }, [])

    const onFileUploaded = () => {
        debugger

        getFiles()
    }


    if (typeof intervento === "undefined" || typeof cliente === "undefined") return "Carico"

    if (!intervento) return "Intervento non trovato"
    if (!cliente) return "Cliente non trovato"



    return <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        <div>
            <Typography variant="h3">Info intervento</Typography>
        </div>

        <div>
            <Typography >Cliente: {cliente.nomePersona}</Typography>
        </div>

        <div>
            <Typography>Data: {formatDate(intervento.data)}</Typography>
        </div>

        <div>
            <Typography>Descrizione:</Typography>
            <Typography variant="body2">
                {intervento.descrizione}
            </Typography>
        </div>

        <div>
            <Typography variant="h4">Immagini</Typography>
            <ImageViewer urls={urls} />
        </div>

        <div>
            <Typography variant="h4">Carica immagini</Typography>
            <ImageUploader intervento={intervento} onFileUploaded={onFileUploaded} />
        </div>
    </div>

}


