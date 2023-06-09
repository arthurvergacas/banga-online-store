import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
  isAdmin: { type: Boolean, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  cpf: { type: String, required: true },
  rg: { type: String, required: true },
  birthDate: { type: String, required: true },
  address: { type: String, required: true },
});

export default mongoose.model('profiles', UserSchema, 'profiles');
