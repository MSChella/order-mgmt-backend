// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDatabase } = require('./dbConfig');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Middleware
app.use(bodyParser.json());

require("dotenv").config();

// MongoDB Connection
connectDatabase();

app.use(express.static(__dirname + "/public"));
// Routes
const ordersRouter = require('./controller/orders.controller');
const placedOrderRouter = require('./controller/placedOrder.controller');
const usersRouter = require('./controller/auth.controller');


app.use('/api/orders', ordersRouter);
app.use('/api/place-orders', placedOrderRouter);
app.use('/api/user', usersRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
