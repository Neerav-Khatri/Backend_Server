const express = require("express");
const bookRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { bookModel } = require("../Model/Book");
const { auth } = require("../MiddleWare/Auth");

// POST Request

bookRouter.post("/", auth, async(req, res) => {
    const book = new bookModel(req.body);
    await book.save();
    res.status(201).send({ "message" : "Book has been added" })
});

// Get Request

bookRouter.get("/", async(req, res) => {
    const { category, author } = req.query;
    let filter = {};
    if (category!==undefined && author!==undefined){
        filter = {"$and" : [{"category" : category}, {"author" : author}]};
    } else if (category!==undefined){
        filter = {"category" : category};
    }
    const books = await bookModel.find(filter);
    res.status(200).send(books);
});

bookRouter.get("/:id", async(req, res) => {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    res.status(200).send(book);
});

// PATCH Request

bookRouter.patch("/:id", auth, async(req, res) => {
    const { id } = req.params;
    await bookModel.findByIdAndUpdate({_id : id}, req.body);
    res.status(204).send({ "message" : "Book has been updated" });
});

// DELETE Request

bookRouter.delete("/:id", auth, async(req, res) => {
    const { id } = req.params;
    await bookModel.findByIdAndDelete({_id : id});
    res.status(202).send({ "message" : "Book has been deleted" });
});




module.exports = { bookRouter };