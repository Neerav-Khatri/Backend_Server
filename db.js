const mongoose = require("mongoose");
require("dotenv").config();

const connetDB = mongoose.connect(process.env.MONGO_DB_API);

module.exports = { connetDB };