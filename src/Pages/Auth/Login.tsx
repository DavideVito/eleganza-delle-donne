import { Box, Button, Typography } from "@mui/material"
import { accedi } from "../../Utils/Auth"

export const Login = () => {
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
        <Button
            onClick={accedi}
            variant="contained"
        >
            Accedi
        </Button>
    </Box>
}