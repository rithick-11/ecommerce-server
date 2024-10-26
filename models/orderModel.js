const mongoose = require('mongoose');

// Define an OrderItem schema for individual products in the order
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Define the Address schema (could be shared with the User schema)
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
});

// Define the Payment schema
const paymentSchema = new mongoose.Schema({
    method: { type: String, required: true }, // e.g., 'Credit Card', 'PayPal'
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        required: true
    },
    transactionId: { type: String }, // Provided by the payment gateway
    paymentDate: { type: Date }
});

// Define the main Order schema
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema], // Array of ordered products
    shippingAddress: addressSchema, // Embed Address schema for shipping
    payment: paymentSchema, // Embed Payment schema
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
