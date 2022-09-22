const mongoose = require('mongoose');

const txSchema = new mongoose.Schema({
    address: String,
    transactions: Array

}, { timestamps: true });

module.exports = mongoose.model("transactions", txSchema);