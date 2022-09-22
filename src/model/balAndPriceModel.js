const mongoose = require('mongoose');

const balAndPriceSchema = new mongoose.Schema({
    balance: String,
    price: Number

}, { timestamps: true });

module.exports = mongoose.model("balAndPrice", balAndPriceSchema);