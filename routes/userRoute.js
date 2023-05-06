const express = require("express");
const router = express.Router();
const user = require("../models/userModel");

const app = express();
app.use(express.json());

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const newuser = new user({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    // Save the new Admin document to the database
    await newuser.save();

    // Send success response
    res.status(200).json({ message: "user created successfully" });
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

  console.log(req.body);
  const { email, password } = req.body;

  // Find user in the database
  const foundUser = await user.findOne({ email: email });

  if (!user) {
    // User not found
    return res.status(401).send({ message: "Invalid email or password" });
  }

  // Check password
  if (!foundUser) {
    // User not found
    return res.status(401).send({ message: "Invalid email or password" });
  }

  // Check password
  if (foundUser.password !== password) {
    // Incorrect password
    return res.status(401).send({ message: "Invalid email or password" });
  }

  // Successful login
  res.status(200).send({ message: "Login successful" });
});

router.get("/details/:email", async (req, res) => {
  try {
    console.log(req.params);

    const user1 = await user.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user1);
    res.json(user1);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Define API endpoints for user data
router.get("/all-users", async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
