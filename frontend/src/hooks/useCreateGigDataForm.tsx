import React, { useState } from 'react'
import QRCodeStyling from "nvp-qr-code-styling"
import { nanoid } from "nanoid"

const defaultFormValue: CreateGigFormData = {
    gigId: '',
    imageUrl: '',
    profileLink: '',
    username: '',
    gigLink: '',
    gigDescription: '',
    rating: '',
    numberOfReviews: '',
    price: '',
    gigMessage: ''
}


const useCreateGigDataForm = () => {

    const [formData, setFormData] = useState(defaultFormValue)
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)

    const uniqueId = nanoid()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
 
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const create = async () => {
        setLoading(true)
        const dataUrl = `${import.meta.env.VITE_APP_URL}?gigId=${uniqueId}`



        const query = await fetch(`/api/gigs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                gigId: uniqueId,
            })
        });

        if (query.status == 201) {
            setFormData(defaultFormValue)
            setLoading(false)
            const response = await query.json()
            console.log("Responded", response)
            const qrCode = new QRCodeStyling({
                width: 300,
                height: 300,
                margin: 20,
                cornersDotOptions: {
                    type: "dot",
                    color: "#22C55E"
                },
                cornersSquareOptions:
                    { type: "extra-rounded", color: "#22C55E" },
                type: "canvas",
                data: dataUrl,
                image: formData.imageUrl,
                dotsOptions: {
                    color: "#22C55E",
                    type: "extra-rounded",
                },
                backgroundOptions: {
                    color: "#e9ebee",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 15
                },
            });
            qrCode.append(document.getElementById("qr-canvas") as HTMLCanvasElement);
            await qrCode.download({ extension: "png", name: uniqueId });
            setErrors("Successful")
            return response
        }

        if (query.status === 400) {
            setErrors("Unable to create gig. Please try again.")
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

export default useCreateGigDataForm