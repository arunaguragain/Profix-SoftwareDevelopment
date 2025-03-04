const express = require('express');
const router = express.Router();
const { 
  registerServiceProvider,
  loginServiceProvider,
  getAllServiceProviders,
  getServiceProviderById,
  updateServiceProvider,
  deleteServiceProvider
} = require('../controller/serviceproviderregistrationController');  // ✅ Make sure this path is correct

// Register a new service provider
router.post('/register', registerServiceProvider);

router.post('/login', loginServiceProvider );

// Get all service providers
router.get('/', getAllServiceProviders);  // ✅ Fix this function reference

// Get a single service provider by ID
router.get('/:id', getServiceProviderById);  // ✅ Fix this function reference

// Update a service provider
router.put('/:id', updateServiceProvider);  // ✅ Fix this function reference

// Delete a service provider
router.delete('/:id', deleteServiceProvider);  // ✅ Fix this function reference

module.exports = router;
