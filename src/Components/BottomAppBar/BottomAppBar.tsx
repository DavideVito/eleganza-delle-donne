import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Typography } from '@mui/material';


export default function BottomAppBar() {

    const buttonRedirect = (url: string) => {
        window.location.href = url
    }

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar style={{ display: 'flex', justifyContent: "space-evenly" }}>
                <IconButton
                    style={{ display: "flex", flexDirection: "column" }}
                    color="inherit"
                    onClick={() => buttonRedirect("/")}>
                    <CalendarMonthIcon />
                    <Typography variant='caption'>
                        Calendario
                    </Typography>
                </IconButton>
                <IconButton
                    style={{ display: "flex", flexDirection: "column" }}
                    color="inherit"
                    onClick={() => buttonRedirect("/contatti")}>

                    <ListIcon />
                    <Typography variant='caption'>
                        Contatti
                    </Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
