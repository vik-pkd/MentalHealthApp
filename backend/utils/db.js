const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(result => console.log('Connected to MongoDB'))
        .catch(err => console.log('Not connected to Database', err.message));
};

module.exports = connectToMongo;