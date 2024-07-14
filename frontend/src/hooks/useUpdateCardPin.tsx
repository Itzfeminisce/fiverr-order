import React, { useState } from 'react'




const defaultFormValue = {
    pin: ''
}

const useUpdateCardPin = () => {

    
    const [formData, setFormData] = useState(defaultFormValue)
    const [errors, setErrors] = useState("")
    // const [cardId, setCardId] = useState("")
    const [loading, setLoading] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const create = async () => {
        setLoading(true)
        const cardId = atob(window.localStorage.getItem("cardId") as string)
        const query = await fetch(`/api/cards/create-pin/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData })
        });

        const response = await query.json()
        if (query.status === 201) {
            setLoading(false)
            setFormData(defaultFormValue)
            return response
        }

        if (query.status === 500) {
            setLoading(false)
            setErrors("Unable to charge card. Please try again.")
            throw new Error()
        }

    }

    return {
        // setCardId,
        create,
        formData,
        handleChange,
        errors,
        loading
    }
}

export default useUpdateCardPin