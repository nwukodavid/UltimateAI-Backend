const axios = require('axios');

const transcribeAudio = async (req, res) => {
  const { audioUrl } = req.body;

  try {
    const response = await axios.post(
      'https://api.assemblyai.com/v2/transcript',
      { audio_url: audioUrl },
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
          'content-type': 'application/json'
        }
      }
    );

    res.json({ id: response.data.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { transcribeAudio };
