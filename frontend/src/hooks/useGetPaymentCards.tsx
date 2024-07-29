import { useEffect, useState } from 'react'





const useGetPaymentCards = (cardId?: string) => {
    const [cards, setCardData] = useState<Card[]>([])

    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/cards${cardId ? `/${cardId}` : ""}`)
            .then((res) => res.json())
            .then((result) => setCardData(result.data))
            .catch(err => setErrors(err.message))
            .finally(()=>setLoading(false));
    }, [])


    return {
        cards,
        errors,
        loading
    }
}

export default useGetPaymentCards