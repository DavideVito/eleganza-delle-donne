import { useEffect, useState } from "react"
import ClientiRepository from "../../Repositories/Clienti/ClientiRepository";
import { Cliente } from "../../Models/Cliente/Cliente";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LinkCreazione = () => <a href="/crea-cliente">Clicca qui per creare un nuovo cliente</a>

const ElemCliente = ({ cliente }: { cliente: Cliente }) => {
    return <Link to={`/info-cliente/${cliente.id}`}>


        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h3">
                    {cliente.nomePersona}
                </Typography>

                <Typography variant="h5">
                    {cliente.numeroTelefono}
                </Typography>
            </CardContent>
        </Card>
    </Link>

}


export const Homepage = () => {

    const [clienti, setClienti] = useState<Cliente[] | undefined>();

    useEffect(() => { ClientiRepository.GetClienti().then(setClienti) }, [])


    if (!clienti) return "Carico"

    if (clienti.length === 0) return <>
        Nessun cliente trovato
        <LinkCreazione />
    </>

    return <>
        <Typography variant="h2">Clienti</Typography>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {
                clienti.map(cliente => <ElemCliente cliente={cliente} />)

            }
        </div>
    </>

}

