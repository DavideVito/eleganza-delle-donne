import { useEffect, useState } from "react"
import ClientiRepository from "../../../../Repositories/Clienti/ClientiRepository"
import { Cliente } from "../../../../Models/Cliente/Cliente"
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"


export const ListaClienti = () => {

    const [clienti, setClienti] = useState<Cliente[] | undefined>()

    useEffect(() => {
        ClientiRepository.GetClienti().then(setClienti)
    }, [])


    return <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Grid item xs={12}>
            <Card >


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

        {!clienti ? "Carico..." : clienti.map(x => <Grid item xs={6} key={x.id}>


            <Card>


                <CardContent>
                    <Typography variant="h5" component="div">
                        {x.nomePersona}
                    </Typography>

                    <Typography>
                        {x.numeroTelefono}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button component={Link} to={`/cliente/${x.id}`} variant="contained" color="primary">
                        Più info
                    </Button>

                </CardActions>
            </Card>
        </Grid>

        )}


    </Grid>

}
