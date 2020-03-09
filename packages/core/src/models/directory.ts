import { Schema, model, Document } from 'mongoose';
import { Organization } from './organization';

export interface Directory extends Document {
  name: string;
  organization: Organization;
}

export const schema = new Schema<Directory>({
  name: {
    type: String,
    required: true
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }
});

schema.index({ name: 1, organization: 1 });

export default model<Directory>('Directory', schema);
