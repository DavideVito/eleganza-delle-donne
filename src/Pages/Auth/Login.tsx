import { Box, Button, TextField, Typography } from "@mui/material"
import { useContext, useRef, useState } from "react"
import { UtenteContext } from "../../Contexts/Utente/UtenteContext";

export const Login = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [_, setLoggato] = useContext(UtenteContext)

    const accedi = () => {

        const testo = inputRef.current!.value;

        const esito = testo == "10082001";

        if (esito) setLoggato()
    }

    return <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: "column",
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5',
        }}
    >
        <Typography variant="h3">Identificazione</Typography>


        <TextField inputRef={inputRef} />

        <Button
            onClick={accedi}
            variant="contained"
        >
            Accedi
        </Button>
    </Box>
}