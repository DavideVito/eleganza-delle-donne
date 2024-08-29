import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage/index.tsx'
import { CreaCliente } from './Pages/Crea/Cliente/CreaCliente.tsx'
import { InfoCliente } from './Pages/Info/InfoCliente/InfoCliente.tsx'
import { NavBar } from './Components/NavBar/NavBar.tsx'
import { InfoIntervento } from './Pages/Info/InfoIntervento/InfoIntervento.tsx'
import { CreaIntervento } from './Pages/Crea/Intervento/CreaIntervento.tsx'

const routes = createBrowserRouter([{
  path: "/",
  element: <Homepage />
},
{
  path: "/crea-cliente",
  element: <CreaCliente />
},

{
  path: "/crea-intervento/:id",
  element: <CreaIntervento />
},

{
  path: "/info-cliente/:id",
  element: <InfoCliente />
}
  ,
{
  path: "/info-intervento/:idcliente/:id",
  element: <InfoIntervento />
}

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar />
    <div style={{ padding: "2rem" }}>
      <RouterProvider router={routes} />
    </div>
  </React.StrictMode>,
)
