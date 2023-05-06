const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  routeNumber: {
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


  // _id: {
  //   type: String,
  // },
  // arriveTime
// : 
// "10.00AM"
// busNumber
// : 
// "bus102"
// date
// : 
// "2023-05-20"
// destination
// : 
// "maharagama"
// origin
// : 
// "kadawatha"
// otherDetails
// : 
// "ac-bus"
// price
// : 
// "1100"
// routeNumber
// : 
// "100"
// startTime
// : 
// "07.00AM"