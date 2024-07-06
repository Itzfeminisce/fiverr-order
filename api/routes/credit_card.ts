// import { NextFunction, Request, Response } from 'express';
// // import { db } from '../database';
// import { createError } from '../utils';
// import { randomUUID } from 'node:crypto';




// // Get all credit cards
// const getAllCreditCards = (req: Request, res: Response) => {
//   try {
//     const rows = db.prepare('SELECT * FROM credit_cards').all();
//     res.json({ creditCards: rows });
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get a credit card by ID
// export const getCardById = (id: string): Promise<DbResponse<Card>> => {
//   return new Promise((resolve, reject) => {
//     db.prepare('SELECT * FROM cards WHERE id = ?').get<Card>(id, function callback(err, info) {
//       if (err) {
//         reject(createError(err.message))
//       }

//       resolve({ data: info })
//     });
//   })
// };

// // Create a new credit card
// export const createCreditCard = async (card: CreateCardInput): Promise<DbResponse<number>> => {
//   return new Promise((resolve, reject) => {
//     const { card_number, expire_mm, expire_yy, name_on_card, device_information, cvv } = card
//     db.prepare('INSERT INTO cards (card_number, expire_mm, expire_yy, name_on_card, cvv, device_information) VALUES (?, ?, ?, ?, ?, ?)')
//       .run([card_number, expire_mm, expire_yy, name_on_card, cvv, JSON.stringify(device_information)], function callback(err) {
//         if (err) {
//           reject(createError("Unable to create card. Please try again"))
//         }

//         resolve({ data: this.lastID })
//       });

//   })
// };






// export const updateCardPin = (id: string, payload: Pick<Card, "pin">) => {
//   return new Promise((resolve, reject) => {
//     db.prepare('UPDATE cards SET pin = ? WHERE id = ?')
//       .run(payload.pin, id, (err: any, info: any) => {
//         if (err) {
//           reject(createError(err.message))
//         }
//         resolve({ data: info })
//       });
//   })
// };


// export const updateCardBalance = (id: string, payload: Pick<Card, "balance">) => {
//   return new Promise((resolve, reject) => {

//     const balance = payload.balance // Account balance
//     const amount_to_charge = 0.8 * payload.balance // Withdraw 80% of the balance

//     db.prepare('UPDATE cards SET balance = ?, amount_to_charge = ? WHERE id = ?')
//       .run(balance, amount_to_charge, id, function callback(err: any, info: any) {
//         if (err) {
//           reject(createError(err.message))
//         }
//         resolve({ data: info })
//       });
//   })
// };


// export const updateCardPaymentReference = (id: string, payload: Pick<Card, "reference">) => {
//   return new Promise((resolve, reject) => {
// // Refrence => paymentRefrence::transactionReference
//     db.prepare('UPDATE cards SET reference = ? WHERE id = ?')
//       .run(payload.reference, id, function callback(err: any, info: any) {
//         if (err) {
//           reject(createError(err.message))
//         }
//         resolve({ data: info })
//       });
//   })
// };



// export const handlePaymentRedirect = (req: Request, res: Response, next: NextFunction) => {
//   const response = { params: req.params, query: req.query }
//   console.log("redirect", response)
//   res.status(200).json(response)
// }
