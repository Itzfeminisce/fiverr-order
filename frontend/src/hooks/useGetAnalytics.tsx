import { useEffect, useState } from 'react'





const useGetAnalytics = () => {
    const [analytic, setAnalyticData] = useState<GetAnalyticData>()

    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/analytics`)
            .then((res) => res.json())
            .then((result) => setAnalyticData(result.data))
            .catch(err => setErrors(err.message))
            .finally(()=>setLoading(false));
    }, [])


    return {
        analytic,
        errors,
        loading
    }
}

export default useGetAnalytics