import Stripe from "stripe";

export const getStripe = () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2024-06-20"
    });
    return stripe
}

export const createError = (message: string, statusCode?: number) => {
    const error = new Error()
    // @ts-ignore
    error.status = statusCode || 500
    error.message = message || "Something happend. Please try again"
    return error
}
