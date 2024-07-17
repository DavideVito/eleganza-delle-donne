import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage/index.tsx'
import { CreaCliente } from './Pages/Crea/Cliente/CreaCliente.tsx'
import { InfoCliente } from './Pages/Info/InfoCliente/InfoCliente.tsx'

const routes = createBrowserRouter([{
  path: "/",
  element: <Homepage />
},
{
  path: "/crea-cliente",
  element: <CreaCliente />
},

{
  path: "/info-cliente/:id",
  element: <InfoCliente />
}

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
