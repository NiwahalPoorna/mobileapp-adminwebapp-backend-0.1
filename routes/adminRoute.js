const express = require("express");
const router = express.Router();
const admin = require("../models/adminModel");

const app = express();
app.use(express.json());

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const newadmin = new admin({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      mobileNumber: req.body.mobileNumber,
      nicNumber: req.body.nicNumber,
      password: req.body.password,
      repassword: req.body.rePassword,
      agree: req.body.agree,
    });

    // Save the new Admin document to the database
    await newadmin.save();

    // Send success response
    res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle the duplicate key error
      res.status(400).json({ message: "The value already exists" });
    } else {
      // Handle other errors
      res.status(500).json({ message: "An error occurred" });
    }
  }
});

router.post("/login", async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  // Find user in the database
  const user = await admin.findOne({ email: email });

  if (!user) {  
    // User not found
    return res.status(401).send({ message: "Invalid email or password" });
  }

  // Check password
  if (user.password !== password) {
    // Incorrect password
    return res.status(401).send({ message: "Invalid email or password" });
    
  }

  // Successful login
  res.status(200).send({ message: "Login successful" });
});

module.exports = router;
