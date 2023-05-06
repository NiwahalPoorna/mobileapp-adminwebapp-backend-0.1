const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
   staffId: {
   type: String,
  },
  name: {
    type: String,
  },
  nic: {
    type: String,
  },
  position: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
