// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        console.log('Fetched orders:', orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: error.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    const order = new Order({
        orderNumber: req.body.orderNumber,
        product: req.body.product,
        quantity: req.body.quantity,
        price: req.body.price,
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
