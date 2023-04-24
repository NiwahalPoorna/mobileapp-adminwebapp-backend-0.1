const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  _id:{
    type: String,
  },
  origin: {
    type: String,
  },
  destination: {
    type: String,
  },
  busNumber: {
    type: String,
  },
  startTime: {
    type: String,
  },
  arriveTime: {
    type: String,
  },
  price: {
    type: String,
  },
  otherDetails: {
    type: String,
  },
  date: {
    type: String,
  },
});

const Bus = new mongoose.model("Bus", busSchema);
module.exports = Bus;
