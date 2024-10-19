import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { ListaClienti as Lc } from "../../../../Components/ListaClienti/ListaClienti"


export const ListaClienti = () => {

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

        <Lc />
    </>




}
