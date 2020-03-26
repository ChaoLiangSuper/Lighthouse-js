import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  id: string;
  username: string;
  password: string;
  phone: string;
  permissions: string[];
}

export const schema = new Schema<User>({
  id: {
    type: String
  },
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
