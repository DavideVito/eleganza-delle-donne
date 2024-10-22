import { useEffect, useState } from "react"
import { Grid, TextField } from "@mui/material";
import { Cliente } from "../../Models/Cliente/Cliente";

interface CercaClientiProps {
    clienti: Cliente[] | undefined,
    setClientiFiltrati: React.Dispatch<React.SetStateAction<Cliente[]>>
}

export const CercaClienti = ({ clienti, setClientiFiltrati }: CercaClientiProps) => {

    const [testo, setTesto] = useState<string>("");
    useEffect(() => {
        const t = testo.toLocaleLowerCase()

        if (!clienti) return;
        const c = clienti.filter(x => x.nomePersona.toLowerCase().includes(t))

        setClientiFiltrati(c)

    }, [testo])


    return <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Grid item xs={12} >
            <TextField
                label="Cerca"
                value={testo}
                onChange={e => setTesto(e.target.value)}

                fullWidth
            />
        </Grid>
    </Grid>


}