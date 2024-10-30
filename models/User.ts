import mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
  },
  password: {
    type: String,
    required: [true, 'pw required'],
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
