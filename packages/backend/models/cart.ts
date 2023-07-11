import mongoose, { Schema } from 'mongoose';

const productCartSchema = new Schema({
  userID: { type: String, required: true },
  cart: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      imageUrl: { type: String, required: true },
      audioUrl: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ]
});

export default mongoose.model('user-carts', productCartSchema, 'user-carts');
