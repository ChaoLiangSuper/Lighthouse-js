import { Schema, model } from 'mongoose';

interface User {
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
});

const User = model('User', userSchema);

export default User;
