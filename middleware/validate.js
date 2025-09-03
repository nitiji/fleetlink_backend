const {bookingSchema,vehicleSchema,userSchema} = require("./schemavalidation")

const userValidation = async (req, res, next) => {
    let payload ={};
    if(req.method == 'GET'){
        payload = req.query;
    }else{
        payload = req.body;
    }
	const { error } = userSchema.validate(payload);
	if (error) {
		res.json({status:406,message:`Error in User Data :${error}`});
	} else {
		next();
	}
};
const vehicleValidation = async (req, res, next) => {
    let payload ={};
    if(req.method == 'GET'){
        payload = req.query;
    }else{
        payload = req.body;
    }
	const { error } = vehicleSchema.validate(payload);
	if (error) {
		res.json({status:406,message:`Error in User Data :${error}`});
	} else {
		next();
	}
};
const bookingValidation = async (req, res, next) => {
    let payload ={};
    if(req.method == 'GET'){
        payload = req.query;
    }else{
        payload = req.body;
    }
	const { error } = bookingSchema.validate(payload);
	if (error) {
		res.json({status:406,message:`Error in User Data :${error}`});
	} else {
		next();
	}
};
module.exports={userValidation,vehicleValidation,bookingValidation};