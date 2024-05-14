const express = require('express');
const bodyParser = require('body-parser');

const connectToMongo = require('./utils/db');

const Game = require('./models/game'); // Adjust the path as per your structure
const GameCategory = require('./models/gameCategory')

const patientRoutes = require('./routes/Patient');
const doctorRoutes = require('./routes/Doctor');
const caregiverRoutes = require('./routes/Caregiver')
const gameRoutes = require('./routes/Game');

const tf = require('@tensorflow/tfjs-node')
const faceapi = require('@vladmandic/face-api');
const { markMissedReminders } = require('./schedulers/cronjob');
const fs = require('fs').promises;

require('dotenv').config()

const app = express();

const PORT = 5000;

const gameCategories = [
  {
    title: 'Puzzle',
    description: 'Engage with games that challenge your problem-solving and pattern recognition skills.',
  },
  {
    title: 'Focus',
    description: 'Hone your concentration and precision with games that require sharp attention and accuracy.',
  },
  {
    title: 'Strategy',
    description: 'Test and enhance your cognitive abilities with games that require strategic thinking and foresight.',
  },
  {
    title: 'Memory',
    description: 'Boost your memory prowess with games designed to test recall abilities and cognitive skills.',
  },
  {
    title: 'Coordination',
    description: 'Sharpen your coordination with games that challenge your reaction speed and precision.',
  },
  {
    title: 'Casual',
    description: 'Relax and unwind with games that provide entertainment and the challenge to beat your high score.',
  },
]


const gameData = [
  {
    name: 'Crossy Road',
    description: 'Enhances quick decision-making and reflexes. Teaches pattern recognition as players identify safe moments to advance.',
    category: 'Coordination',
    path: 'crossy_road.html'
  },
  {
    name: 'Tic Tac Toe',
    description: 'Boosts strategic thinking, pattern recognition, and spatial awareness. Enhances decision-making by teaching players to anticipate and block opponent moves.',
    category: 'Strategy',
    path: 'tic_tac_toe.html'
  },
  {
    name: 'Flip Card',
    description: 'Enhances memory recall and concentration. Improves visual recognition and pattern matching skills.',
    category: 'Memory',
    path: 'card_matching.html'
  },
];

async function seedGameCategories() {
  try {
    const existingCount = await GameCategory.countDocuments();
    if (existingCount === 0) {
      const categories = await GameCategory.insertMany(gameCategories);
      console.log('Game Categories have been seeded');
      return categories.map(category => ({ name: category.title, id: category._id }));
    } else {
      console.log('Game Categories already seeded');
      const categories = await GameCategory.find({});
      return categories.map(category => ({ name: category.title, id: category._id }));
    }
  } catch (error) {
    console.error('Error seeding game category:', error);
    return [];
  }
}

async function seedGames(categoryMapping) {
  try {
    const existingCount = await Game.countDocuments();
    if (existingCount === 0) {
      const gamesToInsert = await Promise.all(gameData.map(async game => {
        const category = categoryMapping.find(cat => cat.name === game.category);
        const htmlPath = `./games/${game.path}`; // Path needs to be adjusted
        const htmlContent = await fs.readFile(htmlPath, 'utf8');
        return {
          title: game.name,
          category: category.id,
          description: game.description,
          htmlContent: htmlContent,
          cssContent: '', // Assume CSS and JavaScript content are handled similarly
          javascriptContent: ''
        };
      }));
      await Game.insertMany(gamesToInsert);
      console.log('Games have been seeded');
    } else {
      console.log('Games already seeded');
    }
  } catch (error) {
    console.error('Error seeding games:', error);
  }
}

// Initialize the database and seed data
async function initDatabase() {
  await connectToMongo();
  const categoryMapping = await seedGameCategories();
  await seedGames(categoryMapping);
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

// Establish connection with database and seed games
initDatabase();

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
