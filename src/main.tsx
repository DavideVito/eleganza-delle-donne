import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage/index.tsx'
import { ListaClienti } from './Pages/Info/Clienti/ListaClienti/ListaClienti.tsx'
import BottomAppBar from './Components/BottomAppBar/BottomAppBar.tsx'
import { CreaCliente } from './Pages/Crea/Cliente/CreaCliente.tsx'
import { InfoCliente } from './Pages/Info/Clienti/InfoCliente/InfoCliente.tsx'

const routes = createBrowserRouter([{
  path: "/",
  element: <Homepage />
},
{
  path: "/contatti",
  element: <ListaClienti />
},
{
  path: "/crea/crea-cliente",
  element: <CreaCliente />
}
  ,
{
  path: "/cliente/:id",
  element: <InfoCliente />
}

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ padding: "1rem" }}>
      <RouterProvider router={routes} />
    </div>
    <BottomAppBar />
  </React.StrictMode>,
)
