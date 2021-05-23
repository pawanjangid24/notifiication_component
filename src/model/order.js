const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    orderTime: {
        type: Date,
        required: true
    },
    orderSource: {
        type: String,
        required: true
    },
    orderValue: {
        type: Number,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    expectedDelivery: {
        type: Date,
        required: true
    }
})

const Order = new mongoose.model('Order', orderSchema);

module.exports = Order