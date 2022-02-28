const mongoose = require('mongoose');
const db = require('./config/db.config');

// Connect to MongoDB database
mongoose.connect(db.DB_URL, {
    'useNewUrlParser': true,
})
.then(() => {
    console.log('Connected to MongoDB.')
})
.catch((err) => console.log("Error:",err.message));


mongoose.connection.on('error', (err) => {
    console.log("Error:", err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

