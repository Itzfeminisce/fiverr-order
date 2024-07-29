import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import GigForm from './pages/CreateQr'
import Home from './pages/Home'
import ThankYou from './pages/ThankYou'
import Layout from './pages/AdminArea/Pages/Layout'
import Gigs from './pages/AdminArea/Pages/Gigs'
import Dashboard from './pages/AdminArea/Pages/Dashboard'
import Cards from './pages/AdminArea/Pages/Cards'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'home/:transaction_id?',
                element: <Home />
            },
            {
                path: 'thank-you',
                element: <ThankYou />
            },
            {
                path: 'create-qr',
                element: <GigForm />
            }
        ]
    },
    {
        path: '/admin-area',
        element: <Layout />,
        children: [
            {path: "", index: true, element: <Dashboard />},
            {path: "gigs", element: <Gigs />},
            {path: "cards", element: <Cards />},
        ]
    }
])