// Load env variables
// Load env variables only in production mode
// Load env variables production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// getting-started.js
const mongoose = require('mongoose');


async function connectToDb() {
    try {
        // Attempt to connect to the database using the DB_URL environment variable
        await mongoose.connect(process.env.DB_URL);
        console.log('connected to database succesfully');
    } catch (error) {
        // If an error occurs, log it to the console
        console.error(error);
    }
}


module.exports = connectToDb;