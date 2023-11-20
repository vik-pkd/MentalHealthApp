const express = require('express');
const bodyParser = require('body-parser');

const connectToMongo = require('./utils/db');

const patientRoutes = require('./routes/Patient');
const doctorRoutes = require('./routes/Doctor');
const Doctor = require('./models/doctor');

const app = express();

const PORT = 5000;

// Establish connection with database
connectToMongo();

app.use(bodyParser.json());

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);

const test = async (email, password) => {
  const doctor = await Doctor.findOne({ email: email });
  console.log(await doctor.comparePassword(password));
}

test("sanjh@gmail.com", "1234");
test("sanjh@gmail.com", "12345");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
