import { useEffect, useState } from 'react'





const useGetGigs = (gigId?: string) => {
    const [gigData, setGigData] = useState<GetGigData[]>([])

    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/gigs${gigId ? `/${gigId}` : ""}`)
            .then((res) => res.json())
            .then((result) => setGigData(result.data))
            .catch(err => setErrors(err.message))
            .finally(()=>setLoading(false));
    }, [])


    return {
        gigData,
        errors,
        loading
    }
}

export default useGetGigs