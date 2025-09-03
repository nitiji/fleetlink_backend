const { Vehicle } = require("../model/vehicleModel");
const { Booking } = require("../model/bookingModel");
async function addVehicle(req, res) {
    try {
        const { vehicle_name, capacity, tyres } = req.body;
        const createVehicle = await Vehicle.create({ vehicle_name: vehicle_name, capacity: capacity, tyres: tyres });
        console.log("createVehicle", createVehicle);
        return res.json({
            status: 201,
            data: createVehicle,
            message: "vehicle added successfully"
        });

    } catch (error) {
        console.log('Register error:', error);
        return res.json({ status: 500, message: "Server error", error: error.message });
    }
}

async function listVehicle(req, res) {
    try {
        const { capacity, fromPincode, toPincode, startTime } = req.query;
        const estimatedRideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
        const start = new Date(startTime);
        const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);
        const vehicles = await Vehicle.find({ capacity: { $gte: capacity } });
        console.log("vehicles", vehicles);
        const vehicleIds = vehicles.map(v => v._id);
        console.log("vehicleIds", vehicleIds);
        //finding booked vehicles
        const conflictingBookings = await Booking.find({
            vehicleId: { $in: vehicleIds },
            startTime: { $lt: end },
            endTime: { $gt: start },
            status: "Confirm"
        });
        console.log("conflictingBookings", conflictingBookings);
        const bookedVehicleIds = conflictingBookings.map(b => b.vehicleId.toString());
        let availableVehicles = vehicles.filter(v => !bookedVehicleIds.includes(v._id.toString()));

        const result = await Promise.all(availableVehicles.map((el) => {
            console.log(el);
            el["estimatedRideDurationHours"] = estimatedRideDurationHours;
            return {
                duration: estimatedRideDurationHours,
                "_id": el?._id,
                "vehicle_name": el?.vehicle_name,
                "capacity": el?.capacity,
                "tyres": el?.tyres,
            }
        }))
        console.log("availableVehicles", result);
        return res.json({
            status: 200,
            availableVehicles: result,
            message: "vehicle fetched successfully"
        });
    } catch (error) {
        console.log('error:', error);
        return res.json({ status: 500, message: "Server error", error: error.message });
    }
}

async function booking(req, res) {
    try {
        const { vehicleID, fromPincode, toPincode, startTime, userId } = req.body;
        console.log("userId", userId);
        // using given formula from task documents
        const estimatedRideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
        const bookingEndTime = startTime + estimatedRideDurationHours;
        const start = new Date(startTime);
        const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);
        const conflict = await Booking.findOne({
            vehicleId: vehicleID,
            startTime: { $lt: end },
            endTime: { $gt: start }
        });
        if (conflict) {
            return res.json({ status: 409, messages: 'Vehicle is already booked during this time.' });
        }
        const booking = await Booking.create({
            vehicleId: vehicleID,
            fromPincode: fromPincode,
            toPincode: toPincode,
            startTime: start,
            endTime: end,
            userId: userId
        });
        return res.json({
            status: 201,
            data: booking,
            message: "booking successfully"
        });

    } catch (error) {
        console.log('Register error:', error);
        return res.json({ status: 500, message: "Server error", error: error.message });
    }
}
module.exports = { addVehicle, listVehicle, booking };
