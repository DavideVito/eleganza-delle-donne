import { useEffect, useState } from "react"
import ClientiRepository from "../../Repositories/Clienti/ClientiRepository";
import { Cliente } from "../../Models/Cliente/Cliente";
import { Button, Card, CardActions, CardContent, Link, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const LinkCreazione = () => <Button variant="contained" color="success" onClick={() => window.location.href = "/crea-cliente"}>
    <AddIcon />
</Button>

const ElemCliente = ({ cliente }: { cliente: Cliente }) => {
    return <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography >
                {cliente.nomePersona}
            </Typography>

            <Typography variant="subtitle1">
                {cliente.numeroTelefono}
            </Typography>
        </CardContent>

        <CardActions>
            <Link href={`/info-cliente/${cliente.id}`} style={{ textDecoration: "none" }} >
                Visualizza
            </Link>
        </CardActions>
    </Card>

}


export const Homepage = () => {

    const [clienti, setClienti] = useState<Cliente[] | undefined>();

    useEffect(() => { ClientiRepository.GetClienti().then(setClienti) }, [])


    if (!clienti) return "Carico"

    if (clienti.length === 0) return <>
        <Typography>
            Nessun cliente trovato
            <br />
        </Typography>
    </>

    return <>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2rem" }}>
            <Typography variant="h2">Clienti</Typography>
            <LinkCreazione />
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {
                clienti.map(cliente => <ElemCliente cliente={cliente} />)

            }
        </div>
    </>

}

