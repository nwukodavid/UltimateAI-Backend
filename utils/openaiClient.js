const axios = require('axios');

const openaiClient = async (prompt, model = 'gpt-4') => {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    return res.data.choices[0].message.content;
  } catch (err) {
    throw new Error(err.response?.data?.error?.message || err.message);
  }
};

module.exports = openaiClient;
