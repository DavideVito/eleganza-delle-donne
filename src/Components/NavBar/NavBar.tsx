import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "../../Assets/Logo.jpg"
const nome = "Eleganza delle donne"



const Immagine = () => <img src={logo} width={40} height={40} style={{ borderRadius: "50%" }} />


export const NavBar = () => {


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a href="/">
                        <Immagine />
                    </a>
                    <Typography
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: "1rem"
                        }}
                    >
                        {nome}
                    </Typography>



                </Toolbar>
            </Container>
        </AppBar>
    );
}