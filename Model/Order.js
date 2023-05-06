const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user : { type: ObjectId, ref: 'User' },
    books : [{ type: ObjectId, ref: 'Book' }],
    totalAmount: Number
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { orderModel };