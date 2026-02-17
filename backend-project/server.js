const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
//Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

//MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
    })
    .catch(err => console.error(
        `could not connect to MongoDB`, err
    ));
