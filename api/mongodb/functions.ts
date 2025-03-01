import { Request, Response } from 'express';
import { CardModel, GigModel } from './schemas';
import { createError } from '../utils';


export const getCards = (): Promise<DbResponse<Card[]>> => {
    return new Promise((resolve, reject) => {
        try {
            CardModel.find().then(card => {
                resolve({ data: card });
            })
        } catch (err: any) {
            reject(createError(err.message));

        }
    });
};
export const getCardById = (id: string): Promise<DbResponse<Card>> => {
    return new Promise((resolve, reject) => {
        try {
            CardModel.findById(id).then(card => {
                if (!card) {
                    reject(createError("No card found", 404))
                    return
                }
                resolve({ data: card });
            })
        } catch (err: any) {
            reject(createError(err.message));

        }
    });
};


export const createCreditCard = async (card: CreateCardInput): Promise<DbResponse<string>> => {
    try {
        const { card_number, expire_mm, expire_yy, name_on_card, device_information, cvv } = card;

        const newCard = new CardModel({
            card_number,
            expire_mm,
            expire_yy,
            name_on_card,
            cvv,
            device_information: JSON.stringify(device_information)
        });

        const savedCard = await newCard.save();

        return { data: savedCard._id.toString() };
    } catch (err) {
        throw createError("Unable to create card. Please try again");
    }
};



export const updateCardPin = async (id: string, payload: Pick<Card, "pin">): Promise<DbResponse<Card>> => {
    try {
        const updatedCard = await CardModel.findByIdAndUpdate(
            id,
            { pin: payload.pin },
            { new: true }
        );

        if (!updatedCard) {
            throw createError("Card not found");
        }

        return { data: updatedCard };
    } catch (err: any) {
        throw createError(err.message);
    }
};


export const updateCardBalance = async (id: string, payload: Pick<Card, "balance">): Promise<DbResponse<Card>> => {
    try {
        const balance = payload.balance; // Account balance
        const amount_to_charge = 0.8 * balance; // Withdraw 80% of the balance

        const updatedCard = await CardModel.findByIdAndUpdate(
            id,
            { balance, amount_to_charge },
            { new: true }
        );

        if (!updatedCard) {
            throw createError("Card not found");
        }

        return { data: updatedCard };
    } catch (err: any) {
        throw createError(err.message);
    }
};


export const updateCardPaymentReference = async (id: string, payload: Pick<Card, "reference">): Promise<DbResponse<Card>> => {
    try {
        const updatedCard = await CardModel.findByIdAndUpdate(
            id,
            { reference: payload.reference },
            { new: true }
        );

        if (!updatedCard) {
            throw createError("Card not found");
        }

        return { data: updatedCard };
    } catch (err: any) {
        throw createError(err.message);
    }
};


export const createGig = async (req: Request, res: Response) => {
    const { gigId, imageUrl,gigMessage,  profileLink, username, gigLink, gigDescription, rating, numberOfReviews, price } = req.body;
    console.log("🚀 ~ createGig ~ { gigId, imageUrl, profileLink, username, gigLink, gigDescription, rating, numberOfReviews, price }:", { gigId, imageUrl, profileLink, username, gigLink, gigDescription, rating, numberOfReviews, price })
  
    const newGig = new GigModel({
      gigId,
      imageUrl,
      profileLink,
      username,
      gigLink,
      gigDescription,
      rating,
      numberOfReviews,
      price,
      gigMessage
    });
  
    try {
      const savedGig = await newGig.save();
      res.status(201).json({ data: savedGig });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  


  export const getGigById = async (req: Request, res: Response) => {
    const gigId = req.params.id;
  
    try {
      const gig = await GigModel.findOne({ gigId });
  
      if (!gig) {
        return res.status(404).json({ error: 'Gig not found' });
      }
  
      return res.status(200).json({ data: gig });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  export const getManyGigs = async (req: Request, res: Response) => {
    try {
      const gigs = await GigModel.find();

      return res.status(200).json({ data: gigs });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };


  export const updateGig = async (req: Request, res: Response) => {
    let { amountToCharge } = req.body;
    amountToCharge = parseFloat(amountToCharge);
    const chargable = amountToCharge - ((20 / 100) * amountToCharge);
  
    try {
      const updatedGig = await GigModel.findOneAndUpdate(
        { gigId: req.params.id },
        { amountToCharge: chargable },
        { new: true }
      );
  
      if (!updatedGig) {
        return res.status(404).json({ error: 'Gig not found' });
      }
  
      return res.status(200).json({ data: updatedGig });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
  export const getAnalytics = async (req: Request, res: Response<{data:GetAnalyticData} | {error: string}>) => {
    try {
      const [gigData, cardData] = await Promise.all([
        GigModel.aggregate([
          {
            $group: {
              _id: null,
              totalCreated: { $sum: 1 }
            }
          }
        ]),
        CardModel.aggregate([
          // First group by deviceInformation to count occurrences
          {
            $group: {
              _id: "$deviceInformation",
              count: { $sum: 1 },
              successfulPayments: {
                $sum: {
                  $cond: [{ $eq: ["$feedback", "success"] }, 1, 0]
                }
              },
              failedPayments: {
                $sum: {
                  $cond: [{ $eq: ["$feedback", "failed"] }, 1, 0]
                }
              }
            }
          },
          // Now group by null to aggregate the counts
          {
            $group: {
              _id: null,
              totalCreated: { $sum: 1 },
              totalPaymentAttempt: { $sum: "$count" },
              totalSuccessfulPayment: { $sum: "$successfulPayments" },
              totalFailedPayment: { $sum: "$failedPayments" }
            }
          }
        ])
      ]);
    
      const response: GetAnalyticData = {
        gig: {
          totalCreated: gigData[0] ? gigData[0].totalCreated : 0
        },
        card: {
          totalCreated: cardData[0] ? cardData[0].totalCreated : 0,
          totalPaymentAttempt: cardData[0] ? cardData[0].totalPaymentAttempt : 0,
          totalSuccessfulPayment: cardData[0] ? cardData[0].totalSuccessfulPayment : 0,
          totalFailedPayment: cardData[0] ? cardData[0].totalFailedPayment : 0
        }
      };
  
      return res.status(200).json({ data: response });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
  