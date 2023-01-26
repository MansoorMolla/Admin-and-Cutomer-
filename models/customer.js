const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
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

// encrypt the password before saving the customer
customerSchema.pre('save', async function (next) {
    const customer = this;
    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 12);
    }
    next();
});

module.exports = mongoose.model('Customer', customerSchema);
