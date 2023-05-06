const mongoose = require("mongoose");

const connection = mongoose.connect(`mongodb+srv://neeravkhatri:neeravkhatri@cluster0.dcucben.mongodb.net/Masai_Library?retryWrites=true&w=majority`);

module.exports = { connection };