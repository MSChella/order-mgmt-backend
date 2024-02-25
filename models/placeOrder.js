// models/placedOrder.js
const mongoose = require('mongoose');

const placedOrderSchema = new mongoose.Schema({
    orderNumber: String,
    product: String,
    quantity: Number,
    price: Number,
}, { strict: true });

const PlacedOrder = mongoose.model('PlacedOrder', placedOrderSchema, 'placedOrders');

module.exports = PlacedOrder;
