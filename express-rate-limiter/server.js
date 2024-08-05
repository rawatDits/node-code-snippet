// server.js
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

// Define the rate limit rule
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, this API does not have rate limiting.');
});

// Apply rate limiter directly to this route
app.get('/limited', apiLimiter, (req, res) => {
  res.send('Hello, this API has rate limiting.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
