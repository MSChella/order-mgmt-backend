const express = require('express');
const router = express.Router();
const PlacedOrder = require('../models/placeOrder.model');
const verifyToken = require('../middleware/authMiddleware');


router.get('/', verifyToken, async (req, res) => {
    try {
        const orders = await PlacedOrder.find();
        console.log('Fetched orders:', orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: error.message });
    }
});


//Create a router for the Orders placed from the frontend
router.post('/submit-orders', verifyToken, async (req, res) => {
    const submittedOrders = req.body; // Assuming you send an array of orders in the request body

    try {
        // Store the submitted orders in the database
        const savedOrders = await PlacedOrder.insertMany(submittedOrders);
        res.status(201).json(savedOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting orders', error: error.message });
    }
});

module.exports = router;