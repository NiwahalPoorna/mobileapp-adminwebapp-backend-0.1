const express = require("express");
const router = express.Router();
const Bus = require("../models/busModel");

const app = express();
app.use(express.json());

router.get("/", async (req, res) => {
  console.log(req.params);

  const { origin, destination, date } = req.query;

  try {
    // Retrieve bus data from the database using the provided origin, destination, and date parameters
    const busData = await Bus.find({ origin, destination });

    console.log(busData);

    // Send the retrieved data as the response
    res.send(busData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving bus data");
  }
});
router.post("/add-busroot", async (req, res) => {
  try {
    console.log(req.body);
    const bus = new Bus({
      routeNumber: req.body.routeNumber,
      busNumber: req.body.busNumber,
      origin: req.body.origin,
      destination: req.body.destination,
      startTime: req.body.startTime,
      arriveTime: req.body.arriveTime,
      price: req.body.price,
      otherDetails: req.body.otherDetails,
      date: req.body.date,
    });

    // Save the new Admin document to the database
    await bus.save();

    // Send success response
    res.status(200).json({ message: "added route successfully" });
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

router.get("/all-roots", async (req, res) => {
  try {
    const bus = await Bus.find();
    res.json(bus);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/busroot/:_id", async (req, res) => {
  try {
    const bus = await Bus.findOne({ _id: req.params._id });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/busroot/:_id", async (req, res) => {
  try {
    console.log(req.body);

    const bus = await Bus.findByIdAndUpdate(
      req.params._id,
      {
        routeNumber: req.body.routeNumber,
        busNumber: req.body.busNumber,
        origin: req.body.origin,
        destination: req.body.destination,
        startTime: req.body.startTime,
        arriveTime: req.body.arriveTime,
        price: req.body.price,
        otherDetails: req.body.otherDetails,
        date: req.body.date,
      },
      { new: true }
    );
    if (!bus) {
      // If the updated document is null or undefined, return a 404 error
      return res
        .status(404)
        .json({ message: "Could not find the bus route to update." });
    }
    res.json(bus);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Could not update the bus route. Please try again later.",
      }); // Return a generic error message
  }
});

router.delete("/busroot/:id", async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.send("Bus deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
