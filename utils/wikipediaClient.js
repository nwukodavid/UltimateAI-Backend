const axios = require('axios');

const fetchWikiSummary = async (query) => {
  try {
    const res = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );
    return res.data.extract;
  } catch (err) {
    return 'No Wikipedia result found.';
  }
};

module.exports = fetchWikiSummary;
