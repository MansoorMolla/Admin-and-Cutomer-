const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const auth = require('../middleware/jwt');

// Admin Login
router.post('/login', adminController.adminLogin);

// Add Customer
router.post('/customers', auth, adminController.addCustomer);

// Update Customer
router.put('/customers/:id', auth, adminController.updateCustomer);

// View Customer Details
router.get('/customers/:id', auth, adminController.viewCustomer);

// View all customers list
router.get('/customers', auth, adminController.viewAllCustomers);

// Delete Customer
router.delete('/customers/:id', auth, adminController.deleteCustomer);

// Active and deactivate customer account
router.put('/customers/:id/status', auth, adminController.activateDeactivateCustomer);

module.exports = router;
