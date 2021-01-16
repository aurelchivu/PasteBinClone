const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

// Load environment variables
dotenv.config();

const home = require('./routes/home');

const app = express();

app.use('/api', home);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found!</h1>');
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
