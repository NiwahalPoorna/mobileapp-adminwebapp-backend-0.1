const mongoose = require("mongoose");

const busManageSchema = new mongoose.Schema({
  busNumber: {
    type: String,
  },
  busType: {
    type: String,
  },
  passengerCapacity: {
    type: String,
  },
  fuelConsumption: {
    type: String,
  },
});

const BusManage = mongoose.model("BusManage", busManageSchema);

module.exports = BusManage;
