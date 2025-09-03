const express = require('express');
const path = require('path');
const Router = require('./routes/users');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
app.use(cors({
    origin: 'http://localhost:5173', // allow  frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // for authentication
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', Router);
// server listening
app.listen(4000, () => {
    console.log("server is running on 4000 port number");
});
// Database connection
mongoose.connect('mongodb://localhost:27017/fleetlink',).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

module.exports = app;
