import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link, Typography } from '@mui/material';

const style: React.CSSProperties =
    { display: "flex", flexDirection: "column" }


export default function BottomAppBar() {

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar style={{ display: 'flex', justifyContent: "space-evenly" }}>





                <Link href="/" color="#fff">
                    <IconButton color='inherit' style={style}>

                        <CalendarMonthIcon />
                        <Typography variant='caption'>
                            Calendario
                        </Typography>
                    </IconButton>
                </Link>


                <Link href="/contatti" color="#fff">
                    <IconButton color='inherit' style={style}>

                        <ListIcon />
                        <Typography variant='caption'>
                            Contatti
                        </Typography>
                    </IconButton>
                </Link>

            </Toolbar>
        </AppBar>
    );
}
