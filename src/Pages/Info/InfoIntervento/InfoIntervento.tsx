import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Intervento } from "../../../Models/Cliente/Intervento"
import InterventiRepository from "../../../Repositories/Interventi/InterventiRepository"
import { Typography } from "@mui/material"
import 'react-slideshow-image/dist/styles.css'
import { Slide } from "react-slideshow-image"

export const InfoIntervento = () => {

    const { idcliente, id } = useParams()

    const [intervento, setIntervento] = useState<Intervento | null | undefined>(undefined)

    useEffect(() => { InterventiRepository.GetIntervento(idcliente!, id!).then(setIntervento) }, [])

    if (typeof intervento === "undefined") return "Carico"

    if (!intervento) return "Intervento non trovato"

    return <>
        <Typography variant="h4">Info</Typography>
        <Typography>Data: {intervento.data.toLocaleString()}</Typography>
        <Typography>Descrizione: {intervento.descrizione}</Typography>

        <Typography variant="h4">Immagini</Typography>
        <ViewerImmagini intervento={intervento} />

        <Typography variant="h4">Carica immagini</Typography>
        <ImageUploader intervento={intervento} />
    </>

}

const ImageUploader = ({ intervento }: { intervento: Intervento }) => {

    const inputRef = useRef<HTMLInputElement | null>(null)


    const uploadFile = async () => {

        const files = inputRef.current!.files

        if (files == null) return;

        const promises = [...files].map(x => InterventiRepository.AddFile(intervento.id, x))

        await Promise.all(promises)
    }

    return <>

        <input type="file" multiple ref={inputRef} />
        <button onClick={uploadFile}>Upload</button>

    </>

}

const ViewerImmagini = ({ intervento }: { intervento: Intervento }) => {

    const [urls, setUrls] = useState<string[] | undefined>();

    useEffect(() => { InterventiRepository.GetFiles(intervento.id).then(setUrls) }, [intervento])

    if (typeof urls === "undefined") return "Carico";

    return <Slideshow immagini={urls} />
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
}

const Slideshow = ({ immagini }: { immagini: string[] }) => {
    return (
        <div className="slide-container">
            <Slide>
                {immagini.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}