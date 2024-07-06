import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../StripeCheckoutForm/index.";
import "../../stripe.css";
import Modal from "../Modal";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51DKSt8AW156duCe7SQPEiEgCvN7VOTUIvpkyfqNdMo72W8v4pFDZmuLxMs69clBbDXMHPL5SKAdodlXO0Mxx71HN00Yzx63HKt");

export default function Stripe() {
    const [clientSecret, setClientSecret] = useState("");
    const [errors, setError] = useState("")

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const getClientSecret = async () => {
            const res = await fetch(`/api/credit_cards/create-payment-intent/${window.localStorage.getItem('orderid')}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
            })
            if(res.status == 502){
                setError("Unable to establich connection. Please check your network connection")
            }else if(res.status == 201){
                const result = await res.json()
                setClientSecret(result.clientSecret)
            }else{
                setError("Unknown error has occured. Please try again")
            }
        }
        getClientSecret()
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    if(errors){
        return <Modal><p>{errors}</p></Modal>
    }

    return (
        <div className="App">
            {clientSecret && (
                // @ts-ignore
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}