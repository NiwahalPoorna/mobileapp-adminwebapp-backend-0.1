// Load env variables
// Load env variables only in production mode
// Load env variables production mode
// json-server --host 0.0.0.0 db.json
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const stripe = require("stripe")(
  "sk_test_51N060eAtNgtPyk47TPiD1Bl61jKx9hN7SYYdjSH2cZ3GnPuLUSCmBC74SQyAciVt2QsFqUNoFILhG0hLzrrO6iZk00iQ1JiWOA"
);

// Import dependencies
const express = require("express");
// Create an express instance (app)
const app = express();
const bodyParser = require("body-parser");

connectToDb();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const adminRoute = require("./routes/adminRoute"); // Require users route file
const userRoute = require("./routes/userRoute");
const busRoute = require("./routes/busRoute");
const bookingRoute = require("./routes/bookingRoute");

// Use the users route with the '/users' URL prefix
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/buses", busRoute);
app.use("/booking", bookingRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// app.post('/posts', (req, res) => {
//   console.log("Data received from client:", req.body);
//   // process the received data and send response
//   res.send({ success: true });
// });

app.post("/intents", async (req, res) => {
  try {
    console.log(req.body);
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});

// curl -X POST -H "Content-Type: application/json" \
// 		-d "{\"amount\":17950}" \
//     http://localhost:3000/payments/intents
