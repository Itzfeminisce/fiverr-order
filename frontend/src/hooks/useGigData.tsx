import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const useOrderData = () => {
    const location = useLocation()
    const [orderData, setOrderData] = useState<CreateGigFormData | null>(null)

    const url = new URLSearchParams(location.search)

    useEffect(() => {
        const fetchOrder = (orderId: string) => {
            fetch(`/api/gigs/${orderId}`)
                .then(res => res.json())
                .then(result => setOrderData(result.data))
        }
        const orderid = url.get("orderid") || window.localStorage.getItem("orderid")
        if (orderid) {
            fetchOrder(orderid as string)
        }
    }, [])

    return orderData
}

export default useOrderData