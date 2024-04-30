const express = require('express');
const bodyParser = require('body-parser');

const connectToMongo = require('./utils/db');

const Game = require('./models/game'); // Adjust the path as per your structure

const patientRoutes = require('./routes/Patient');
const doctorRoutes = require('./routes/Doctor');
const caregiverRoutes = require('./routes/Caregiver')

const tf = require('@tensorflow/tfjs-node')
const faceapi = require('@vladmandic/face-api');

require('dotenv').config()

const app = express();

const PORT = 5000;

const gameData = [
  { name: 'Fruit Slicer', category: 'Casual' },
  { name: 'Rock Paper Scissors', category: 'Casual' },
  { name: 'Snake Game', category: 'Coordination' },
  { name: 'Ping Pong', category: 'Coordination' },
  { name: 'Crossy Road', category: 'Coordination' },
  { name: 'Connect Four', category: 'Focus' },
  { name: 'Speed Typing', category: 'Focus' },
  { name: 'Archery', category: 'Focus' },
  { name: 'Flappy Bird', category: 'Focus' },
  { name: 'Maze', category: 'Focus' },
  { name: 'Tilting Maze', category: 'Focus' },
  { name: 'Fruit Slicer', category: 'Focus' },
  { name: 'Tic Tac Toe', category: 'Strategy' },
  { name: 'Hangman', category: 'Strategy' },
  { name: '2048 Games', category: 'Strategy' },
  { name: 'Candy Crush', category: 'Puzzle' },
  { name: 'Minesweeper', category: 'Puzzle' },
  { name: 'Tetris', category: 'Puzzle' },
  { name: 'Tower Blocks', category: 'Puzzle' },
  { name: 'Slot Game', category: 'Puzzle' },
  { name: '2048 Games', category: 'Puzzle' },
  { name: 'Flip Card', category: 'Memory' },
  { name: 'Quiz', category: 'Memory' },
];

async function seedGames() {
  try {
    const existingCount = await Game.countDocuments();
    if (existingCount === 0) {
      await Game.insertMany(gameData);
      console.log('Games have been seeded');
    } else {
      console.log('Games already seeded');
    }
  } catch (error) {
    console.error('Error seeding games:', error);
  }
}

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

// Seed Games
// seedGames();

app.use(bodyParser.json());

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/caregivers', caregiverRoutes)

app.use('/', (req, res) => {
  res.send({ status: 'success', message: 'Welcome to backend zone!' })
})

// const test = async (email, password) => {
//   const doctor = await Doctor.findOne({ email: email });
//   console.log(await doctor.comparePassword(password));
// }

// test("sanjh@gmail.com", "1234");
// test("sanjh@gmail.com", "12345");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
