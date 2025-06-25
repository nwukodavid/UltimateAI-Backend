const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const event = req.body;

  if (event.event === 'charge.success') {
    const email = event.data.customer.email;
    const plan = event.data.metadata?.plan;

    // TODO: Lookup user by email and update their plan in DB
    console.log(`Payment success for ${email}, plan: ${plan}`);
  }

  res.sendStatus(200);
});

module.exports = router;
