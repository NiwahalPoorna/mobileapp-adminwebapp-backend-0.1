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
      status:req.body.status,
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


router.get('/seats', (req, res) => {
  const { date, startTime, busNumber,email} = req.query;
  
  let allSeats = [];
  // Filter the booking records based on the provided parameters
 // Find the matching booking record
 booking.find({ date ,startTime,busNumber,email})
    .then(bookings => {
      if (bookings) {
        allSeats = bookings.reduce((seats, booking) => seats.concat(booking.seats), []);

        res.json(allSeats);
        // res.json(bookings);

        console.log(allSeats);
      } else {
        res.json(null);
      }
    })
    .catch(error => {
      console.error('Error retrieving booking record', error);
      res.status(500).json({ error: 'Failed to retrieve booking record' });
    });
});

// http://localhost:3000//booking/seats?date=2023-05-01&startTime=8:00AM&busNumber=BUS100


router.get('/bookings/:_id', async (req, res) => {
  try {
    const bookingId = req.params._id;
    const Booking = await booking.findById(bookingId);

    if (Booking) {
      res.json(Booking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error fetching booking data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






router.put('/bookings/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    // Update the booking in the database
    const updatedBooking = await booking.findByIdAndUpdate(bookingId, { status }, { new: true });

    res.json(updatedBooking);
  } catch (error) {
    console.log('Error updating booking status:', error);
    res.status(500).json({ error: 'Error updating booking status' });
  }
});


