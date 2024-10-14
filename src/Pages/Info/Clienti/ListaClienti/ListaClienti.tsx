import React, { useEffect, useState } from "react"
import ClientiRepository from "../../../../Repositories/Clienti/ClientiRepository"
import { Cliente } from "../../../../Models/Cliente/Cliente"
import { Button, Card, CardActions, CardContent, Link, Typography } from "@mui/material"

const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
}

export const ListaClienti = () => {

    const [clienti, setClienti] = useState<Cliente[] | undefined>()

    useEffect(() => {
        ClientiRepository.GetClienti().then(setClienti)
    }, [])


    return <div>
        <Link href="/crea/crea-cliente">Crea Cliente</Link>

        <div style={style}>
            {
                !clienti ? "Carico..." : clienti.map(x => <Card key={x.id}>


                    <CardContent>
                        <Typography variant="h5" component="div">
                            {x.nomePersona}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button onClick={() => window.location.href = `/cliente/${x.id}`}>
                            Più info
                        </Button>

                    </CardActions>
                </Card>

                )


            }
        </div>
    </div >

}
