const express = require("express");
const todoRouter = express.Router();
const { todoModel } = require("../Model/Schema");
const jwt = require("jsonwebtoken");

// GET Request

todoRouter.get("/", async(req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "Learn_Auth");
    try {
        if (decode){
            const task = await todoModel.find({"userID" : decode.userID});
            res.status(200).send(task);
        }
    } catch (error) {
        res.status(400).send({"message" : "No task has been added."});
        console.log(error);
    }
});

// POST Request

todoRouter.post("/add", async(req, res) => {
    try {
        const task = new todoModel(req.body);
        await task.save();
        res.status(200).send({"message" : "Task has been added."})
    } catch (error) {
        res.status(400).send({"message" : "Invalid Token"});
        console.log(error);
    }
});

// PATCH Request

todoRouter.patch("/patch/:id", async(req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "Learn_Auth");
    try {
        if (decode){
            const { id } = req.params;
            await todoModel.findByIdAndUpdate({_id: id}, req.body);
            res.status(200).send({"message" : "Task has been updated."});
        }
    } catch (error) {
        res.status(400).send({"message" : "Login First"});
        console.log(error);
    }
});

// DELETE Request

todoRouter.delete("/delete/:id", async(req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "Learn_Auth");
    try {
        if (decode){
            const { id } = req.params;
            await todoModel.findByIdAndDelete({_id: id});
            res.status(200).send({"message" : "Task has been deleted."});
        }
    } catch (error) {
        res.status(400).send({"message" : "Login First"});
        console.log(error);
    }
});

module.exports = { todoRouter };