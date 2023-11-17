const express = require('express');
const bodyParser = require('body-parser');

const connectToMongo = require('./utils/db');

const patientRoutes = require('./routes/Patient');
const prescriptionRoutes = require('./routes/Prescription');

const app = express();

const PORT = 5000;

// Establish connection with database
connectToMongo();

app.use(bodyParser.json());

app.use('/patients', patientRoutes);

app.use('/prescription', prescriptionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
