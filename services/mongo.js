const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Mongoose connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Connection error
db.on('error', console.error.bind(console, 'connection error:'));

// Connection success
db.once('open', () => {
    console.log('Successfully connected to MongoDB');
});

module.exports = db;
