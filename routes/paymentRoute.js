const express = require("express");
const router = express.Router();

const app = express();
app.use(express.json());

const stripe = require("stripe")(
  "sk_test_51N060eAtNgtPyk47TPiD1Bl61jKx9hN7SYYdjSH2cZ3GnPuLUSCmBC74SQyAciVt2QsFqUNoFILhG0hLzrrO6iZk00iQ1JiWOA"
);

router.post("/", async (req, res) => {
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
module.exports = router;
