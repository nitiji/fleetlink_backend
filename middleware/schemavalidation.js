const Joi = require('joi');

const bookingSchema = Joi.object().keys({
    vehicleId: Joi.string().required(),
    fromPincode: Joi.string().required(),
    toPincode: Joi.string().required(),
    startTime: Joi.date().required(),
    // endTime: Joi.date().greater(Joi.ref('startTime')).required(),
}).unknown(true);

const vehicleSchema = Joi.object().keys({
    vehicle_name: Joi.string().required(),
    capacity: Joi.string().required(),
    tyres: Joi.string().required(),
}).unknown(true);

const userSchema=Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    password:Joi.string().required(),
}).unknown(true);

module.exports={bookingSchema,vehicleSchema,userSchema};