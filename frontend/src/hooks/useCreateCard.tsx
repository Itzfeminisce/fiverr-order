import React, { useState } from 'react'





const useCreateCard = () => {
    const defaultFormValue = {
        card_number: '',
        expire_mm: '',
        expire_yy: '',
        name_on_card: '',
        cvv: '',
    }


    const [formData, setFormData] = useState(defaultFormValue)
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)

      
    function getTimeDifferenceFromUTC() {
        const currentTime = new Date();
        return currentTime.getTimezoneOffset(); // This returns the difference in minutes
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as {name: string, value: string}
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const create = async () => {
        setLoading(true)

        // Include this function's result in your request
        const requestData = {
            device_information: {
                httpBrowserLanguage: navigator.language,
                httpBrowserJavaEnabled: navigator.javaEnabled(),
                httpBrowserJavaScriptEnabled: true,
                httpBrowserColorDepth: screen.colorDepth,
                httpBrowserScreenHeight: screen.height,
                httpBrowserScreenWidth: screen.width,
                httpBrowserTimeDifference: getTimeDifferenceFromUTC(),
                userAgentBrowserValue: navigator.userAgent
            }
        };


        const query = await fetch(`/api/cards/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, ...requestData })
        });

        if (query.status === 201) {
            setLoading(false)
            setFormData(defaultFormValue)
            const response = await query.json()
            window.localStorage.setItem("cardId", btoa(response.data))
            return response
        }

        if (query.status === 500) {
            setLoading(false)
            setErrors("Unable to charge card. Please try again.")
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

export default useCreateCard