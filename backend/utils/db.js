const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://vikas:PnGj5LI4o2fkJYeW@mental-health-app.4p7tleg.mongodb.net/mentalhealthapp';

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(result => console.log('Connected to MongoDB'))
        .catch(err => console.log('Connection error with Database'));
};

module.exports = connectToMongo;