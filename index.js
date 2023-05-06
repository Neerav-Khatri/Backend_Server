const express = require("express");

const { connection } = require("./db");
const { userRouter } = require("./Routes/users");
const { bookRouter } = require("./Routes/books");

const app = express();

app.use(express.json());
app.use("/", userRouter);
app.use("/books", bookRouter);


app.listen(8080, async() => {
    try {
        await connection;
        console.log("App is connected to DB");
        console.log(`Server is listening to port 8080`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = { app };