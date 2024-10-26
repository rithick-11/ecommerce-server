const mongoose = require('mongoose');

// Define an Address schema
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
});

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: [addressSchema],
        required: false
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'seller'],
        default: 'customer'
    },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    wishlist: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            addedAt: { type: Date, default: Date.now }
        }
    ],
    orderHistory: [
        {
            orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
            date: { type: Date, default: Date.now }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
