const stripe = require('../config/stripe');

const handleStripePayment = async (req, res) => {
  const { email } = req.body;

  try {
    const customer = await stripe.customers.create({ email });
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'UltimateAI Pro Plan' },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handlePaystackWebhook = (req, res) => {
  res.json({ message: 'Webhook received (mock)' });
};

module.exports = { handleStripePayment, handlePaystackWebhook };
