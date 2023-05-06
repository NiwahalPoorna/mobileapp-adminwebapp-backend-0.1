const express = require("express");
const router = express.Router();
const BusManage = require("../models/busManageModel");

// Get all buses
router.get("/all-buses", async (req, res) => {
  try {
    const buses = await BusManage.find();
    res.json(buses);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/add-bus", async (req, res) => {
  try {
    console.log(req.body);
    const busManage = new BusManage({
      busNumber: req.body.busNumber,
      busType: req.body.busType,
      passengerCapacity: req.body.passengerCapacity,
      fuelConsumption: req.body.fuelConsumption,
    });

    // Save the new Admin document to the database
    await busManage.save();

    // Send success response
    res.status(200).json({ message: "add bus successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle the duplicate key error
      res.status(400).json({ message: "adding error" });
    } else {
      // Handle other errors
      res.status(500).json({ message: "An error occurred" });
    }
  }
});

router.get("/bus/:_id", async (req, res) => {
  try {
    const bus = await BusManage.findOne({ _id: req.params._id });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message : error.message });
  }
});

router.put("/bus/:_id", async (req, res) => {
  try {
    console.log(req.body);

    const updatedBus = await BusManage.findByIdAndUpdate(
      req.params._id,
      {
        busNumber: req.body.busNumber,
        busType: req.body.busType,
        passengerCapacity: req.body.passengerCapacity,
        fuelConsumption: req.body.fuelConsumption,
      },
      { new: true }
    );
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete a bus
router.delete("/delete-bus/:id", async (req, res) => {
  try {
    await BusManage.findByIdAndDelete(req.params.id);
    res.send("Bus deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});



// // Update an existing bus
// router.put("/buses/:id", async (req, res) => {
//   try {
//     const bus = await BusManage.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(bus);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal server error");
//   }
// });



module.exports = router;
