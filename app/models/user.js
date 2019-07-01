const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    type: {
        default: 'user',
        type: String
    },
    date: { type: Date, default: Date.now },
  });

const User = mongoose.model('User', userSchema);

module.exports = User;