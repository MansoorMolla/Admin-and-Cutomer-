const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');

// Register
router.post('/register', customerController.register);

// Login
router.post('/login', customerController.login);

// Edit Profile
router.put('/profile', customerController.editProfile);

// Delete Account
router.delete('/account', customerController.deleteAccount);

// Logout
router.get('/logout', customerController.logout);

module.exports = router;
