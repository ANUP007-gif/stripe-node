// This is your test secret API key.
const stripe = require('stripe')('sk_test_51KLRVtSBeMKYRtPTMPdJfKU28zQ2taKyZWQH9RKLkmx1z3WoHwpuF42jJYkQs5GC6uSOugbBCpmwqtQl6YsXQHNB00ISt7UHYC');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4000';
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};


app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1KLmqkSBeMKYRtPTXoxZRQwN",
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
    console.log('=========',session);
  res.redirect(303, session.url);
});




app.get("/create-payment-intent", async (req, res) => {
  

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 300000.00,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  console.log(paymentIntent);
  res.redirect("checkout.html");

  });

//**********************************cofirm Payment intent */
app.get("/confirm-payment-intent",async(req,res)=>{


// To create a PaymentIntent for confirmation, see our guide at: https://stripe.com/docs/payments/payment-intents/creating-payment-intents#creating-for-automatic
const paymentIntent = await stripe.paymentIntents.confirm(
  'pi_3KMRtKSBeMKYRtPT0vdHG3pR',
  {payment_method: 'pm_card_visa'}

);
console.log('===========',paymentIntent);
})




app.listen(4000, () => console.log('Running on port 4000'));