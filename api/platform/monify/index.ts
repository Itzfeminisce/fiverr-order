import { randomUUID } from "crypto"
// import { getCardById, updateCardPaymentReference } from "../../routes/credit_card"
import Request from "../../utils/request"
import { getCardById, updateCardPaymentReference } from "../../mongodb/functions"

const REDIRECT_URL = "http://localhost:3000/cards/redirect"





export const initTransaction = async (amount: string, metadata?: Partial<{ email: string, name: string, description: string }>) => {
    const transactionReference = randomUUID()
    const payload = {
        "amount": amount,
        "customerName": metadata?.name,
        "customerEmail": metadata?.email,
        "paymentReference": transactionReference,
        "paymentDescription": metadata?.description,
        "currencyCode": "NGN",
        "contractCode": "7851571781",
        "redirectUrl": REDIRECT_URL,
        "paymentMethods": ["CARD"]
    }

    console.log("Initializing transaction...", payload, transactionReference)
    const response = await Request<Transaction>("/api/v1/merchant/transactions/init-transaction", "POST", payload)
    if (response) {

    }
    console.log("Transaction completed ", response)
    return response
}



export const authorizeOtp = async (ref: string, token: string, tokenId: string) => {
    const payload = {
        "transactionReference": ref,
        "collectionChannel": "API_NOTIFICATION",
        "tokenId": tokenId,
        "token": token
    }
    return await Request<any>("/api/v1/merchant/cards/otp/authorize", "POST", payload)
}

export const chargeCard = async (id: string,) => {

    const { data: card } = await getCardById(id)

    const trxn = await initTransaction(card?.amount_to_charge as any, {
        description: "Test Charge",
        email: "test@email.com",
        name: card?.name_on_card
    })

    const payload = {
        "transactionReference": trxn?.transactionReference,
        "collectionChannel": "API_NOTIFICATION",
        "card": {
            "number": card?.card_number,
            "expiryMonth": card?.expire_mm,
            "expiryYear": card?.expire_yy,
            "pin": card?.pin,
            "cvv": card?.cvv,
            deviceInformation: JSON.parse((card?.device_information as unknown) as string)
        }
    }
    console.log("Charging card", payload)
    const response = await Request<ChargeCard>("/api/v1/merchant/cards/charge", "POST", payload)
    // Reference => transactionReference::paymentRefrence
    await updateCardPaymentReference(id, { reference: `${payload.transactionReference}::${response?.paymentReference}` })
    console.log("Card charged successfully", response)
    return response
}