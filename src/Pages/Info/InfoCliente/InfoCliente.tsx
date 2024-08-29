import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Cliente } from "../../../Models/Cliente/Cliente";
import ClientiRepository from "../../../Repositories/Clienti/ClientiRepository";
import { Button, Card, CardContent, Link, Typography } from "@mui/material";
import InterventiRepository from "../../../Repositories/Interventi/InterventiRepository";
import { Intervento } from "../../../Models/Cliente/Intervento";
import AddIcon from '@mui/icons-material/Add';

export const InfoCliente = () => {
    const { id } = useParams();

    const [cliente, setcliente] = useState<Cliente | undefined | null>();

    useEffect(() => { ClientiRepository.GetCliente(id!).then(setcliente) }, [])

    if (typeof cliente === "undefined") return "Carico"

    if (cliente == null) return "Cliente non trovato"

    return <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        <div>
            <Typography variant="h2">{cliente.nomePersona}</Typography>

            <Typography variant="h5">
                Telefono: &nbsp;
                <Link href={`tel://${cliente.numeroTelefono}`}>
                    {cliente.numeroTelefono}
                </Link>
            </Typography>
        </div>

        <ViewInterventi cliente={cliente} />

    </div>

}

const ElemIntervento = ({ cliente, intervento }: { cliente: Cliente, intervento: Intervento }) => {
    return <>

        <Link href={`/info-intervento/${cliente.id}/${intervento.id}`} >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography >
                        Descrizione: {intervento.descrizione}
                    </Typography>

                    <Typography variant="body1">
                        Data: {intervento.data.toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    </>

}

const ViewInterventi = ({ cliente }: { cliente: Cliente }) => {

    const [interventi, setInterventi] = useState<Intervento[] | undefined>()

    useEffect(() => { InterventiRepository.GetInterventi(cliente).then(setInterventi) }, [])


    if (!interventi) return "Carico"

    return <>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2rem" }}>
            <Typography variant="h2">Interventi</Typography>
            <Button variant="contained" color="success" onClick={() => window.location.href = `/crea-intervento/${cliente.id}`}>
                <AddIcon />
            </Button>
        </div>


        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {interventi.map(x => <ElemIntervento cliente={cliente} intervento={x} />)}
        </div>

    </>
}