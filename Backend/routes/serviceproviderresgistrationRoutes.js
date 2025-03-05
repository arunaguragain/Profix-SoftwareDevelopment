const express = require('express');
const router = express.Router();
const { 
  registerServiceProvider,
  loginServiceProvider,
  getAllServiceProviders,
  getServiceProviderById,
  updateServiceProvider,
  deleteServiceProvider
} = require('../controller/serviceproviderregistrationController');  

// Register a new service provider
router.post('/register', registerServiceProvider);

router.post('/login', loginServiceProvider );

// Get all service providers
router.get('/', getAllServiceProviders);  
// Get a single service provider by ID
router.get('/:id', getServiceProviderById);  

// Update a service provider
router.put('/:id', updateServiceProvider);  

// Delete a service provider
router.delete('/:id', deleteServiceProvider);  

module.exports = router;
