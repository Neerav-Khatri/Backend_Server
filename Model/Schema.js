const mongoose = require("mongoose");

const user = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    city : String
});

const todo = mongoose.Schema({
    task : String,
    status : Boolean,
    userID : String 
});

const userModel = mongoose.model("Users", user);
const todoModel = mongoose.model("Todos", todo);

module.exports = { userModel, todoModel };