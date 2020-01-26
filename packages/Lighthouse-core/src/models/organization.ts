import { Schema, model, Document } from 'mongoose';

export interface Organization extends Document {
  name: string;
  credit: number;
  currency: string;
}

export const schema = new Schema<Organization>({
  name: {
    type: String,
    unique: true,
    required: true
  },
  credit: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'AUD'
  }
});

export default model<Organization>('Organization', schema);
