const express = require('express');

const User = require('./models/user');
const connectToMongo = require('./utils/db');

const app = express();

const PORT = 5000;

// Establish connection with database
connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
