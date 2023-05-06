const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (token){
        jwt.verify(token, "Masai_Library", async(err, decoded) => {
            if (decoded){
                next();
            } else {
                res.status(400).send({ "message" : "Access denied, Kindly login first" });
            }
        });
    } else {
        res.status(400).send({ "message" : "Access denied, Kindly login first" });
    }
};

module.exports = { auth };