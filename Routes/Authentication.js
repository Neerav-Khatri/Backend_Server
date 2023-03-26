const express = require("express");
const authRouter = express.Router();
const { userModel } = require("../Model/Schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

authRouter.post("/register", async(req, res) => {
    const { name, email, password, city } = req.body;
    try {
        bcrypt.hash(password, 8, async(err, hash) => {
            const user = new userModel({ name, email, password: hash, city });
            await user.save();
            res.status(200).send({ "msg" : "User has been registered" });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ "error" : error});
    }
});

authRouter.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try{
        const user=await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result){
                    res.status(200).send({"msg":"Login Successful","token": jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), data: 'TODO_APP'}, 'Learn_Auth')});
                } else {
                    res.status(400).send({"message" : "Wrong Credentials"});
                }
            });
        } else {
            res.status(400).send({"message" : "Login Failed"});
        }
    } catch(err){
        console.log(err)
    }     
});


module.exports = { authRouter };