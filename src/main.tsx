import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage/index.tsx'
import { InfoCliente } from './Pages/Info/InfoCliente/InfoCliente.tsx'
import BottomAppBar from './Components/BottomAppBar/BottomAppBar.tsx'

const routes = createBrowserRouter([{
  path: "/",
  element: <Homepage />
},
{
  path: "/contatti",
  element: <InfoCliente />
},


])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ padding: "1rem" }}>
      <RouterProvider router={routes} />
    </div>
    <BottomAppBar />
  </React.StrictMode>,
)
