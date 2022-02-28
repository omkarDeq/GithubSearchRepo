const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const routes = require('./routes')

// Connect to Databse
const Database = require('./db');

// Middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// API version 1 routes
app.use('/api/v1', routes);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the github server!')
})

// Test API by pinging the url
app.get('/ping', (req, res)=>{
  res.send('pong')
})

const port = process.env.PORT

// Start the server
app.listen(port, () => {
  console.log(`Server started running at http://localhost:${port}`)
})