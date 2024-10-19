import { Container, Typography, Paper, List, ListItem, ListItemText, Divider, IconButton, Button } from "@mui/material"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Cliente } from "../../../../Models/Cliente/Cliente"
import { Nota } from "../../../../Models/Cliente/Nota"
import ClientiRepository from "../../../../Repositories/Clienti/ClientiRepository"
import CreaNote from "../../../Crea/Note"
import NoteRepository from "../../../../Repositories/Note/NoteRepository"
import DeleteIcon from '@mui/icons-material/Delete';


export const InfoCliente = () => {

    const { id } = useParams()

    const [cliente, setCliente] = useState<Cliente | undefined | null>()
    const [interventi, setInterventi] = useState<Nota[] | undefined>()

    useEffect(() => {
        ClientiRepository.GetCliente(id!).then(setCliente)
    }, [])

    useEffect(() => {

        if (!cliente) return
        getNote(cliente)


    }, [cliente?.id])

    const getNote = (cliente: Cliente) => { NoteRepository.GetNote(cliente).then(setInterventi) }

    const deleteNota = async (nota: Nota) => {
        await NoteRepository.EliminaNota(cliente!, nota)
        getNote(cliente!)
    }

    const deleteCliente = async () => {
        const ris = confirm(`Sicuro di voler eliminare: ${cliente?.nomePersona}? Quest'operazione è irreversibile`)
        if (!ris) return


        await ClientiRepository.EliminaCliente(cliente!)
        window.location.href = "/contatti"
    }



    if (typeof cliente === "undefined") return "Carico..."
    if (!cliente) return "Cliente non trovato"


    return <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Informazioni Cliente
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, mb: 4 }}>
            <Typography variant="h6">Anagrafica</Typography>
            <Typography variant="body1">Nome: {cliente.nomePersona}</Typography>
            <Typography variant="body1">Telefono: {cliente.numeroTelefono}</Typography>

        </Paper>

        <Paper sx={{ padding: 2, mb: 4 }}>
            <Typography variant="h6">Azioni</Typography>
            <Divider />

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Button component={Link} to={`tel://${cliente.numeroTelefono}`}
                    variant="outlined"
                    color="primary">
                    Chiama
                </Button>

                <Button component={Link} to={`/crea/crea-cliente/${id}`}
                    variant="outlined"
                    color="primary">
                    Modifica
                </Button>



                <Button color="error" variant="contained" onClick={deleteCliente}>
                    Elimina cliente
                </Button>
            </div>
        </Paper>

        <Typography variant="h6" gutterBottom>
            Note
        </Typography>
        <List>
            {

                !interventi ? "Carico..." :
                    interventi.map((intervento) => <div key={intervento.id}>
                        <ListItem style={{ justifyContent: "space-between" }}

                            secondaryAction={
                                <IconButton color="error" onClick={() => deleteNota(intervento)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={intervento.descrizione}
                                secondary={intervento.data.toLocaleDateString()}
                            />


                        </ListItem>
                        <Divider />
                    </div>
                    )
            }
        </List>

        <Divider />
        <CreaNote cliente={cliente} onAfterSubmit={() => getNote(cliente)} />

    </Container>


}
