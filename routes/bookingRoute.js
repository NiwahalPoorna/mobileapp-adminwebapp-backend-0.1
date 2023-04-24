const express = require("express");
const router = express.Router();
const booking = require("../models/bookingModel");

const app = express();
app.use(express.json());

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newbooking = new booking({
      busNumber: req.body.busNumber,
      origin: req.body.origin,
      destination: req.body.destination,
      buscard: req.body.id,
      startTime: req.body.startTime,
      arriveTime: req.body.arriveTime,
      seatCount: req.body.seatCount,
      totalPrice: req.body.totalPrice,
      date: req.body.date,
        email:req.body.email,
      //   date:req.body.date,
    });

    // Save the new Admin document to the database
    await newbooking.save();

    // Send success response
    res.status(200).json({ message: "booking successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle the duplicate key error
      res.status(400).json({ message: "booking error" });
    } else {
      // Handle other errors
      res.status(500).json({ message: "An error occurred" });
    }
  }
});

module.exports = router;
