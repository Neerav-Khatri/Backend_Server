const express = require("express");
const { connectDB } = require("./db");
const { authRouter } = require("./Routes/Authentication");
const { todoRouter } = require("./Routes/Todo");
const { auth } = require("./Middleware/Auth");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
// app.use(cors());
app.use("/user", authRouter);
app.use(auth);
app.use("/todo", todoRouter);

app.listen(8080, async() => {
    try {
        await connectDB;
        console.log("Application is connected to the database");
        console.log(`Server is listening to port ${process.env.SERVER_PORT}`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = app;