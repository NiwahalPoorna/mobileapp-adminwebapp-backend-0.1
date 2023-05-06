const express = require("express");
const router = express.Router();
const Staff = require("../models/staffModel");

const app = express();
app.use(express.json());


router.post("/add-staff", async (req, res) => {
  try {
    console.log(req.body);
    const staff = new Staff({
        staffId: req.body.staffId,
        name: req.body.name,
        nic: req.body.nic,
        position: req.body.position,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
     
    });

    // Save the new Admin document to the database
    await staff.save();

    // Send success response
    res.status(200).json({ message: "added staff successfully" });
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

router.get("/all-staff", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/staff-emp/:_id", async (req, res) => {
  try {
    const staff = await Staff.findOne({ _id: req.params._id });
    if (!staff) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/staff-emp/:_id", async (req, res) => {
  try {
    console.log(req.body);

    const staff = await Staff.findByIdAndUpdate(
      req.params._id,
      {
        staffId: req.body.staffId,
        name: req.body.name,
        nic: req.body.nic,
        position: req.body.position,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
      },
      { new: true }
    );
    if (!staff) {
      // If the updated document is null or undefined, return a 404 error
      return res
        .status(404)
        .json({ message: "Could not find the bus route to update." });
    }
    res.json(staff);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Could not update the bus route. Please try again later.",
      }); // Return a generic error message
  }
});

router.delete("/staff-emp/:id", async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.send("staff delete successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
