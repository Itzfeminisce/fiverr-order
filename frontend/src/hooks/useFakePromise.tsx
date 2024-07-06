import { useState } from 'react'

const useFakePromise = () => {

    const [isLoading, setIsLoading] = useState(false)

    const wait = (ms: number = 2000, ) => {
        setIsLoading(true)

        return new Promise((res) => setTimeout(() => {
            setIsLoading(false)
            res(true)
        }, ms))
    }

    return {
        isLoading,
        wait
    }

}

export default useFakePromise