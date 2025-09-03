const {User} = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
async function register(req, res) {
    try {
        const { name, email, mobile, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.json({ status: 400, message: "This user already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: name,
            email: email,
            mobile: mobile,
            password: hashedPassword,
        });
        return res.json({
            status: 201,
            message: "User registered successfully",
            data: newUser,
        });
    } catch (error) {
        console.log('Register error:', error);
        return res.json({ status: 500, message: "Server error", error: error.message });
    }
}

async function login(req,res) {
    try {
        const {email, password} = req.body;
        console.log("loginEmail and  loginPassword", email,password);
        const getUserData = await User.findOne({email:email});
        console.log(getUserData);
        if (getUserData) {
            const isMatch = await bcrypt.compare(password, getUserData.password);
            if (isMatch) {
                console.log(getUserData);
                //token
                const token = jwt.sign({
                    userId: getUserData._id,
                    email: getUserData.email
                }, 'yyyy@123', { expiresIn: '48h' });
                console.log("token",token);
                // converting plain object for getting better response
                const userObj = getUserData.toObject();
                const result ={...userObj,token:token}
                return res.json({ status: 200, data: result, message: "login successful" });
            }
            else {
                return res.json({ status: 400, message: "password is incorrect" });
            }
        } else {
            return res.json({ status: 400, message: "invalid user or password" });
        }
    } catch (error) {
        console.log('Register error:', error);
        return res.json({ status: 500, message: "Server error", error: error.message });
    }
}

module.exports={register,login}