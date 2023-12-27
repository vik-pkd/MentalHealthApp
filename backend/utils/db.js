const mongoose = require('mongoose');

// const mongoURI = 'mongodb+srv://112001055:ZttLWoUqHQSyTlYf@mentalcluster.6dedrsp.mongodb.net/?retryWrites=true&w=majority';
const mongoURI = 'mongodb://112001055:ZttLWoUqHQSyTlYf@ac-cebwmg2-shard-00-00.6dedrsp.mongodb.net:27017,ac-cebwmg2-shard-00-01.6dedrsp.mongodb.net:27017,ac-cebwmg2-shard-00-02.6dedrsp.mongodb.net:27017/?ssl=true&replicaSet=atlas-j3f82h-shard-0&authSource=admin&retryWrites=true&w=majority';

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(result => console.log('Connected to MongoDB'))
        .catch(err => console.log('Not connected to Database', err));
};

module.exports = connectToMongo;