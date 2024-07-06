import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import GigForm from './pages/CreateQr'
import Home from './pages/Home'
import ThankYou from './pages/ThankYou'

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
    }
])