require('dotenv').config();

const config = {
  baseUrl: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
};

module.exports = config;
