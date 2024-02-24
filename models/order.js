// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: Number,
    orderNumber: String,
    product: String,
    quantity: Number,
    price: Number,
}, { strict: true });

const Order = mongoose.model('Order', orderSchema, 'instore');

module.exports = Order;
