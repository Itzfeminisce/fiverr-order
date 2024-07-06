import React, { useState } from 'react'

const defaultFormValue: CardBalance = {
   balance: 0,
}


const useUpdateCardBalance = () => {

    const [formData, setFormData] = useState(defaultFormValue)
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    
    const create = async () => {
        setLoading(true)
        const cardId = atob(window.localStorage.getItem("cardId") as string)
        const query = await fetch(`/api/cards/create-balance/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
            })
        });

        if (query.status == 200) {
            setFormData(defaultFormValue)
            setLoading(false)
            const response = await query.json()
            setErrors("Successful")
            return response
        }

        if (query.status === 500) {
            setErrors("Unable to update gig. Please try again.")
            setLoading(false)
            throw new Error()
        }
    }


    return {
        create,
        formData,
        handleChange,
        errors,
        loading
    }
}

export default useUpdateCardBalance