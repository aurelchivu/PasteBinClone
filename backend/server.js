const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error'); // custom error handler
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const home = require('./routes/home');
const users = require('./routes/users');

const app = express();

// HTTP request logger middleware for node.js
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api', home);
app.use('/api/v1/users', users);

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
