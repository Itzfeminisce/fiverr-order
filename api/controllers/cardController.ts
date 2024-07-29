import { NextFunction, Request, Response } from "express"
// import { createCreditCard, getCardById, updateCardBalance, updateCardPin } from "../routes/credit_card"
import { chargeCard } from "../platform/monify"
import { createCreditCard, getCardById, getCards, updateCardBalance, updateCardPin } from "../mongodb/functions"

const cardController = {
    createCard: async (req: Request, res: Response, next: NextFunction) => {
        const { card_number, cvv, device_information, expire_mm, expire_yy, name_on_card } = req.body as Card
        try {
            const response = await createCreditCard({ card_number, cvv, device_information, expire_mm, expire_yy, name_on_card })
            res.status(201).json(response)
        } catch (error: any) {
            res.status(error.status || 500).json({error: error.message})
        }
    },

    createBalance: async (req: Request, res: Response, next: NextFunction) => {
        const { balance } = req.body as Card
        try {
            const response = await updateCardBalance(req.params.id, {balance})
            res.status(200).json(response)
        } catch (error: any) {
            res.status(error.status || 500).json(error.message)
        }
    },

    
    createPin: async (req: Request, res: Response, next: NextFunction) => {
        const { pin } = req.body as Card
        try {
            await updateCardPin(req.params.id, { pin})
            const charge = await chargeCard(req.params.id)
            res.status(200).json({data: charge})
        } catch (error: any) {
            res.status(error.status || 500).json({error: error.message})
        }
    },
    getCard: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await getCardById(req.params.id)
            // TODO: Charge card immediately
            res.status(200).json(response)
        } catch (error: any) {
            res.status(error.status || 500).json({error: error.message})
        }
    },
    getCards: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await getCards()
            res.status(200).json(response)
        } catch (error: any) {
            res.status(error.status || 500).json({error: error.message})
        }
    },


}

export default cardController