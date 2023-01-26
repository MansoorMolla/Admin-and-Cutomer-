const Admin = require('../models/admin');
const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const errorHandler = require('../middleware/errorHandler');
const sendMail = require('../utils/sendMail');

exports.adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, admin.password);
        if (!isEqual) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ email: admin.email, userId: admin._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userId: admin._id.toString() });
    } catch (err) {
        errorHandler(err, next);
    }
};

exports.addCustomer = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { email, name, phoneNumber, profilePic } = req.body;
        const password = Math.random().toString(36).substring(2, 8);
        const hashedPassword = await bcrypt.hash(password, 12);
        const customer = new Customer({
            email,
            name,
            phoneNumber,
            profilePic,
            password: hashedPassword
        });
        await customer.save();
        sendMail(email, 'Welcome to our service', `Your account has been created successfully. Your temporary password is ${password}. Please login and change your password.`);
        res.status(201).json({ message: 'Customer added successfully', customer });
    } catch (err) {
        errorHandler(err, next);
    }
};

exports.updateCustomer = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const customer = await Customer.findById(req.params.customerId);
        if (!customer) {
            const error = new Error('Customer not found');
            error.statusCode = 404;
            throw error;
        }
        const { name, phoneNumber, profilePic } = req.body;
        customer.name = name;
        customer.phoneNumber = phoneNumber;
        customer.profilePic = profilePic;
        await customer.save();
        res.status(200).json({ message: 'Customer updated successfully', customer });
        } catch (err) {
        errorHandler(err, next);
        }
        };
        
        exports.viewCustomer = async (req, res, next) => {
        try {
        const customer = await Customer.findById(req.params.customerId);
        if (!customer) {
        const error = new Error('Customer not found');
        error.statusCode = 404;
        throw error;
        }
        res.status(200).json({ customer });
        } catch (err) {
        errorHandler(err, next);
        }
        };
        
        exports.viewAllCustomers = async (req, res, next) => {
        try {
        const customers = await Customer.find();
        res.status(200).json({ customers });
        } catch (err) {
        errorHandler(err, next);
        }
        };
        
        exports.deleteCustomer = async (req, res, next) => {
        try {
        const customer = await Customer.findById(req.params.customerId);
        if (!customer) {
        const error = new Error('Customer not found');
        error.statusCode = 404;
        throw error;
        }
        await customer.remove();
        res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (err) {
        errorHandler(err, next);
        }
        };
        
        exports.activeDeactivateCustomer = async (req, res, next) => {
        try {
        const customer = await Customer.findById(req.params.customerId);
        if (!customer) {
        const error = new Error('Customer not found');
        error.statusCode = 404;
        throw error;
        }
        customer.isActive = !customer.isActive;
        await customer.save();
        res.status(200).json({ message: `Customer account ${customer.isActive ? 'activated' : 'deactivated'} successfully`, customer });
        } catch (err) {
        errorHandler(err, next);
        }
        };
        
        
