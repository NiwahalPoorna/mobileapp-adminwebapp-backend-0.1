const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  busNumber: {
    type: String,
  },
  origin: {
    type: String,
  },
  destination: {
    type: String,
  },
  buscard: {
    type: String,
  },
  date: {
    type: String,
  },
  startTime: {
    type: String,
  },
  arriveTime: {
    type: String,
  },
  seatCount: {
    type: String,
  },
  totalPrice: {
    type: String,
  },
  email: {
    type: String,
  },
  seats: {
    type: [Number],
    default: [],
  },
});

const booking = mongoose.model("booking", bookingSchema);

module.exports = booking;
