const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const hpp = require('hpp');
const cors = require('cors');
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
const paste = require('./routes/pastes')
const users = require('./routes/users');

const app = express();

// Body parser
app.use(express.json());

// HTTP request logger middleware for node.js
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1', home);
app.use('/api/v1/auth', auth);
app.use('/api/v1/pastes', paste);
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
