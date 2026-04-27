
const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    source: String,
    destination: String,
    distance: Number,
    cost: Number
});

module.exports = mongoose.model("Flight", flightSchema);
