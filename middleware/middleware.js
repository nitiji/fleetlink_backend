const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
function verify_token(req, res, next) {
    const tokenHeader = req.headers.authorization;
    console.log("Raw token header:", tokenHeader);

    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication token is required" });
    }
    const token = tokenHeader.split(" ")[1];
    // Authorization : token pass from header;
    jwt.verify(token, 'yyyy@123', async function (err, decoded) {
        console.log(err);
        console.log("decoded value", decoded);
        const user = await User.findOne({ _id: decoded.userId });
        if (user) {
            if (req.method == "GET") {
                req.query.userId = user._id;
            }
            else {
                req.body.userId = user._id;
            }
            next();
        }
        else {
            return res.json({ status: 404, data: {}, message: "data not found" });
        }
    })
}
module.exports = { verify_token };