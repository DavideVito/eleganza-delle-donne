import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage/index.tsx'
import { ListaClienti } from './Pages/Info/Clienti/ListaClienti/ListaClienti.tsx'
import BottomAppBar from './Components/BottomAppBar/BottomAppBar.tsx'
import { CreaCliente } from './Pages/Crea/Cliente/CreaCliente.tsx'
import { InfoCliente } from './Pages/Info/Clienti/InfoCliente/InfoCliente.tsx'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material'
import { ClienteContextProvider } from './Contexts/Cliente/ClienteContext.tsx'
import { AppuntamentiContextProvider } from './Contexts/Appuntamenti/AppuntamentiContext.tsx'
import { Login } from './Pages/Auth/Login.tsx'
import { UtenteContext, UtenteContextProvider } from './Contexts/Utente/UtenteContext.tsx'


const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#de79aa',
      light: '#E3B9C3', // Optional
      dark: '#9A7B88',  // Optional
      contrastText: '#FFFFFF', // Optional
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081', // Optional
      dark: '#c51162',  // Optional
      contrastText: '#FFFFFF', // Optional
    },
  },
};

const theme = createTheme(themeOptions);

const routes = createBrowserRouter([

  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/contatti",
    element: <ListaClienti />
  },
  {
    path: "/crea/crea-cliente/:id?",
    element: <CreaCliente />
  }
  ,
  {
    path: "/cliente/:id",
    element: <InfoCliente />
  },
])



const App = () => {

  const [isLoggato, _] = useContext(UtenteContext)

  if (!isLoggato) return <Login />

  return <>
    <div style={{ padding: "1rem", marginBottom: "5rem" }}>
      <RouterProvider router={routes} />
    </div>
    <BottomAppBar />
  </>

}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UtenteContextProvider>
      <ClienteContextProvider>
        <AppuntamentiContextProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </AppuntamentiContextProvider>
      </ClienteContextProvider>
    </UtenteContextProvider>
  </React.StrictMode>,
)