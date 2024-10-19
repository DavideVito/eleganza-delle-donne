import { useEffect, useState } from "react"
import ClientiRepository from "../../../../Repositories/Clienti/ClientiRepository"
import { Cliente } from "../../../../Models/Cliente/Cliente"
import { Button, Card, CardActions, CardContent, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { CercaClienti } from "./CercaClienti"


export const ListaClienti = () => {
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    const handleContactClick = (cliente: Cliente) => {
        navigate(`/cliente/${cliente.id}`);
    };

    const [clienti, setClienti] = useState<Cliente[] | undefined>()
    const [clientiFiltrati, setClientiFiltrati] = useState<Cliente[]>([])


    useEffect(() => {
        ClientiRepository.GetClienti().then(setClienti)
    }, [])

    useEffect(() => {
        if (!clienti) {
            setClientiFiltrati([])
            return
        }
        setClientiFiltrati(clienti!)
    }, [clienti])




    return <>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Aggiungi un cliente
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button component={Link} to="/crea/crea-cliente" variant="contained" color="success">
                            Crea cliente
                        </Button>

                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <div style={{ height: "1rem" }}></div>
        <CercaClienti clienti={clienti} setClientiFiltrati={setClientiFiltrati} />

        <div style={{ height: "1rem" }}></div>

        <Card sx={{ width: "100%", height: "70vh", overflowY: "auto" }}>
            <List>
                {!clienti ? "Carico..." : clientiFiltrati.map((x, index) => <React.Fragment key={x.id}>
                    <ListItem
                        onClick={() => handleContactClick(x)} // Handle click event for redirection
                        sx={{
                            cursor: 'pointer', // Makes the ListItem look clickable
                            '&:hover': { backgroundColor: '#f0f0f0' }, // Hover effect
                        }}
                    >
                        <ListItemText
                            primary={x.nomePersona}
                        />

                    </ListItem>
                    {index < clienti.length - 1 && <Divider variant="middle" />}
                </React.Fragment>
                )}
            </List>
        </Card>
    </>




}
