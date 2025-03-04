const express = require('express');
const router = express.Router();
const { registerServiceProvider } = require('../controller/serviceproviderregistrationController');

router.post('/serviceproviderregistration', registerServiceProvider);

module.exports = router;