import { Schema, model, Document } from 'mongoose';
import { Directory } from './directory';

export interface Record extends Document {
  directory: Directory;
  data: {
    [s: string]: string;
  };
}

export const schema = new Schema<Record>({
  directory: {
    type: Schema.Types.ObjectId,
    ref: 'Directory'
  },
  data: {
    type: Object,
    default: {}
  }
});

export default model<Record>('Record', schema);
