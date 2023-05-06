const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/User");


// REGISTER 

userRouter.post("/register", async(req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const data = await userModel.find({ email });

    if (data.length>0){
        res.status(400).send({ "message" : "User already exist, please login" });
    } else {
        bcrypt.hash(password, 8, async(err, hash) => {
            const user = new userModel({ name, email, password : hash, isAdmin });
            await user.save();
            res.status(200).send({ "message" : "User has been register" });
        })
    }
});


// LOGIN

userRouter.post("/login", async(req, res) => {
    const { email, password } = req.body;
    const user = await userModel.find({ email });

    if (user.length>0){
        bcrypt.compare(password, user[0].password, (err, result) => {
            if (result){
                res.status(201).send({ "message" : "Login succesful", "token" : jwt.sign({ data: "Mock" }, "Masai_Library") })
            } else {
                res.status(400).send({ "message" : "Wrong Credentials" });
            }
        });
    } else {
        res.status(400).send({ "message" : "Wrong Credentials" });
    }
});

module.exports = { userRouter };