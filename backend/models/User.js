// Import dependencies.
import 'dotenv/config';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // storing raw password (bad practice)
});

const User = mongoose.model('User', userSchema);
export default User;
