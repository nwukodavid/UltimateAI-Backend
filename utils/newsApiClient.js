const axios = require('axios');

const fetchNews = async (topic) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${process.env.NEWS_API_KEY}`
    );
    return response.data.articles.slice(0, 3);
  } catch (err) {
    return [];
  }
};

module.exports = fetchNews;
