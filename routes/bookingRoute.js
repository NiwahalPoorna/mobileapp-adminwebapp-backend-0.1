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
      email: req.body.email,
      seats: req.body.seats,
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

router.get("/details", async (req, res) => {
  try {
    console.log(req.query);
    const { email } = req.query;

    // Query the database or other data source for bookings with the specified email
    const bookings = await booking.find({ email });
    console.log(bookings);

    // Return the booking data in the response body
    res.status(200).json(bookings);
  } catch (error) {
    // Handle any errors and return an error response
    console.error(error);
    res.status(500).json({ message: "Error retrieving booking data" });
  }
});

// Define a route that returns all the bookings
router.get("/all-bookings", async (req, res) => {
  try {
    const bookings = await booking.find();
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
