import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  phone: string;
}

export const schema = new Schema<User>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    default: []
  }
});

export default model<User>('User', schema);
