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

module.exports = router;
