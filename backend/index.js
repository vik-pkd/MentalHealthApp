const express = require('express');
const bodyParser = require('body-parser');

const connectToMongo = require('./utils/db');

const patientRoutes = require('./routes/Patient');
const doctorRoutes = require('./routes/Doctor');
const caregiverRoutes = require('./routes/Caregiver')
const gameRoutes = require('./routes/Game');

const tf = require('@tensorflow/tfjs-node')
const faceapi = require('@vladmandic/face-api');
const { markMissedReminders } = require('./schedulers/cronjob');

require('dotenv').config()

const app = express();

const PORT = 5000;

// Load all the Face models 
async function LoadModels() {
  // Load the models
  // __dirname gives the root directory of the server
  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/fmodels");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/fmodels");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/fmodels");
}
LoadModels();

// Establish connection with database
connectToMongo();

app.use(bodyParser.json());

// run cron job to mark missed reminders from patients

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/caregivers', caregiverRoutes)
app.use('/games', gameRoutes);

app.use('/', (req, res) => {
  res.send({ status: 'success', message: 'Welcome to backend zone!' })
})

markMissedReminders();

// const test = async (email, password) => {
  //   const doctor = await Doctor.findOne({ email: email });
  //   console.log(await doctor.comparePassword(password));
  // }

  // test("sanjh@gmail.com", "1234");
// test("sanjh@gmail.com", "12345");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
