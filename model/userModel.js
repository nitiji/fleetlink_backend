const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, default: null },
    email: { type: String, default: null },
    mobile: { type: String, default: null },
    password: { type: String, default: null },

});
const User = mongoose.model('User', userSchema);
module.exports = {User};


