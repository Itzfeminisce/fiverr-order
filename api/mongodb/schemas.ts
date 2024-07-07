import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema<Card>({
    card_number: { type: Number, required: true},
    expire_mm: { type: Number, required: true },
    expire_yy: { type: Number, required: true },
    name_on_card: { type: String, required: true },
    cvv: { type: Number, required: true },
    pin: { type: Number },
    balance: { type: Number, default: 0 },
    last_otp: { type: Number, default: null },
    amount_to_charge: { type: Number },
    reference: { type: String },
    device_information: { type: String },
  });

const gigSchema: Schema = new Schema({
    gigId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    profileLink: { type: String },
    username: { type: String, required: true, default: 'Fiverr User' },
    gigLink: { type: String },
    gigDescription: { type: String },
    rating: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 },
    price: { type: Number, default: 0},
  });
  
  const GigModel = mongoose.model<Gig>('Gig', gigSchema);
  const CardModel = mongoose.model<Card>('Card', cardSchema);



  export {GigModel, CardModel};