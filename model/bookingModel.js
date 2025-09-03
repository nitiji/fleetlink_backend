const mongoose = require('mongoose');
const { Schema } = mongoose;
const bookingSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    userId: { type: String, default: null },
    vehicleId: { type: String, default: null },
    fromPincode: { type: String, default: null },
    toPincode: { type: String, default: null },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    status: { type: String, default:'Confirm'},
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = {Booking};
