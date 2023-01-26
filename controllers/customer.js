const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const errorHandler = require('../middleware/errorHandler');

exports.register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { email, name, phoneNumber, profilePic, password } = req.body;
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            const error = new Error('This email is already in use');
            error.statusCode = 409;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const customer = new Customer({
            email,
            name,
            phoneNumber,
            profilePic,
            password: hashedPassword
        });
        await customer.save();
        const token = jwt.sign({ email: customer.email, userId: customer._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Customer registered successfully', token, userId: customer._id.toString() });
    } catch (err) {
        errorHandler(err, next);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email });
        if (!customer) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, customer.password);
        if (!isEqual) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ email: customer.email, userId: customer._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userId: customer._id.toString() });
    } catch (err) {
        errorHandler(err, next);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.userId);
        if (!customer) {
            const error = new Error('Customer not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Profile retrieved successfully', customer });
    } catch (err) {
        errorHandler(err, next);
    }
};

exports.editProfile = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isempty()) {
          const error = new Error('Validation failed');
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
          }
          const customer = await Customer.findById(req.userId);
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
          res.status(200).json({ message: 'Profile updated successfully', customer });
          } catch (err) {
          errorHandler(err, next);
          }
          };
          
          exports.deleteAccount = async (req, res, next) => {
          try {
          const customer = await Customer.findById(req.userId);
          if (!customer) {
          const error = new Error('Customer not found');
          error.statusCode = 404;
          throw error;
          }
          await customer.remove();
          res.status(200).json({ message: 'Account deleted successfully' });
          } catch (err) {
          errorHandler(err, next);
          }
          };
          
          exports.logout = async (req, res, next) => {
            try {
            //TODO: Implement logout function
            res.status(200).json({ message: 'Logged out successfully' });
            } catch (err) {
            errorHandler(err, next);
            }
            };
