import mongoose, { Schema, Document } from 'mongoose';

const LoginSchema: Schema = new Schema({
  userID: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model('user-credentials', LoginSchema, 'user-credentials');
