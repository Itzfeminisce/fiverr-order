import { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function StripeCheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${import.meta.env.VITE_APP_URL}/thank-you`,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage("Something's not right. Please give a try again");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: {
            type: "tabs"
        }
    }

    return (
        <>

            {/* Show any error or success messages */}
            {message && <p className='text-sm text-red-500 font-semibold text-center py-2'>{message}</p>
            }
            <form id="payment-form" onSubmit={handleSubmit}>

                {/* @ts-ignore */}
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                {/* <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
                </button> */}

                <button disabled={isLoading || !stripe || !elements} className={`focus:ring-0 border-0 active:ring-0 focus:outline-none focus:border-0 bg-blue-700 text-white p-2 rounded-md block w-full shadow ${isLoading && "disabled:bg-blue-400"}`}>
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
            </form>
        </>
    );
}