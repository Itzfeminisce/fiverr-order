import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
// import "./stripe.css"
import './index.css'
import { routes } from './routes.tsx'
import RoleProvider from './contexts/RoleProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoleProvider>
      <RouterProvider router={routes} fallbackElement={"Loading..."} />
    </RoleProvider>
  </React.StrictMode>,
)
