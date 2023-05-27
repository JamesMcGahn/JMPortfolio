const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');



const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username required']
    },
    password: {
        type: String,
        required: [true, 'pw required']
    },
})


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
})



module.exports = mongoose.models.User ? mongoose.models.User : mongoose.model('User', UserSchema);
