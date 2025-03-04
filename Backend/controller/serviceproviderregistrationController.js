const bcrypt = require('bcrypt');
const ServiceProvider = require('../model/ServiceproviderRegistration');

/**
 * @desc Register a new Service Provider
 * @route POST /serviceproviders/register
 */
exports.registerServiceProvider = async (req, res) => {
  const { fullName, address, email, contact, password, profilePicture } = req.body;

  if (!fullName || !address || !email || !contact || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Service Provider
    const newServiceProvider = await ServiceProvider.create({
      fullName,
      address,
      email,
      contact,
      password: hashedPassword,
      profilePicture,   
    });

    res.status(201).json({ message: 'Registration successful', serviceProvider: newServiceProvider });
  } catch (error) {
    console.error('❌ Error registering service provider:', error);
    res.status(500).json({ error: 'Error registering service provider' });
  }
};

/**
 * @desc Update a Service Provider
 * @route PUT /serviceproviders/:id
 */
exports.updateServiceProvider = async (req, res) => {
  const { id } = req.params;
  const { fullName, address, email, contact, profilePicture } = req.body;

  try {
    const serviceProvider = await ServiceProvider.findByPk(id);

    if (!serviceProvider) {
      return res.status(404).json({ error: 'Service provider not found' });
    }

    // Update the service provider details
    await serviceProvider.update({
      fullName: fullName || serviceProvider.fullName,
      address: address || serviceProvider.address,
      email: email || serviceProvider.email,
      contact: contact || serviceProvider.contact,
      profilePicture: profilePicture || serviceProvider.profilePicture,  
    });

    res.status(200).json({ message: 'Service provider updated successfully', serviceProvider });
  } catch (error) {
    console.error('❌ Error updating service provider:', error);
    res.status(500).json({ error: 'Error updating service provider' });
  }
};




/**
 * @desc Get all Service Providers
 * @route GET /serviceproviders
 */
exports.getAllServiceProviders = async (req, res) => {
  try {
    const serviceProviders = await ServiceProvider.findAll();
    res.status(200).json(serviceProviders);
  } catch (error) {
    console.error('❌ Error fetching service providers:', error);
    res.status(500).json({ error: 'Error fetching service providers' });
  }
};

/**
 * @desc Get a Single Service Provider by ID
 * @route GET /serviceproviders/:id
 */
exports.getServiceProviderById = async (req, res) => {
  const { id } = req.params;

  try {
    const serviceProvider = await ServiceProvider.findByPk(id);

    if (!serviceProvider) {
      return res.status(404).json({ error: 'Service provider not found' });
    }

    res.status(200).json(serviceProvider);
  } catch (error) {
    console.error('❌ Error fetching service provider:', error);
    res.status(500).json({ error: 'Error fetching service provider' });
  }
};

/**
 * @desc Delete a Service Provider
 * @route DELETE /serviceproviders/:id
 */
exports.deleteServiceProvider = async (req, res) => {
  const { id } = req.params;

  try {
    const serviceProvider = await ServiceProvider.findByPk(id);

    if (!serviceProvider) {
      return res.status(404).json({ error: 'Service provider not found' });
    }

    await serviceProvider.destroy();
    res.status(200).json({ message: 'Service provider deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting service provider:', error);
    res.status(500).json({ error: 'Error deleting service provider' });
  }
};
