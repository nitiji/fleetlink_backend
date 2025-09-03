const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    vehicle_name: { type: String, default: null },
    capacity: { type: String, default: null },
    tyres: { type: String, default: null },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = {Vehicle};


