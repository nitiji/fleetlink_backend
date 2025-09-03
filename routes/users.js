const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Vehicle } = require("../model/vehicleModel");
const { Booking } = require("../model/bookingModel");
const {User} = require("../model/userModel");
const { verify_token } = require('../middleware/middleware');
const { register,login} = require('../controller/user');
const {addVehicle,listVehicle,booking} = require('../controller/vehicle');
const {userValidation,vehicleValidation,bookingValidation}=require('../middleware/validate')
router.post("/register",userValidation,register);
router.post("/login",login);
router.post("/vehicle",vehicleValidation,verify_token,addVehicle);
router.get("/vehicle/available",verify_token,listVehicle);
router.post("/book",bookingValidation,verify_token,booking);

module.exports = router;
