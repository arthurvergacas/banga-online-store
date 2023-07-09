import mongoose, { Schema, Document } from 'mongoose';

const PaymentSchema: Schema = new Schema({
  userID: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardholder: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  cvv: { type: Number, required: true },
  products: [
    {
      id: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ]
});

export default mongoose.model('payment-details', PaymentSchema, 'payment-details');
