const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ServiceProvider = require('../model/ServiceproviderRegistration');

exports.registerServiceProvider = async (req, res) => {
  const { fullName, address, email, contact, password } = req.body;

  if (!fullName || !address || !email || !contact || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newServiceProvider = await ServiceProvider.create({
      fullName,
      address,
      email,
      contact,
      password: hashedPassword,
        
    });

    res.status(201).json({ message: 'Registration successful', serviceProvider: newServiceProvider });
  } catch (error) {
    console.error('❌ Error registering service provider:', error);
    res.status(500).json({ error: 'Error registering service provider' });
  }
};

exports.loginServiceProvider = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const serviceProvider = await ServiceProvider.findOne({ where: { email } });

    if (!serviceProvider) {
      return res.status(404).json({ error: 'Service provider not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, serviceProvider.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: serviceProvider.serviceProviderId, email: serviceProvider.email }, "your_secret_key", { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, serviceProvider });
  } catch (error) {
    console.error('❌ Error logging in service provider:', error);
    res.status(500).json({ error: 'Error logging in service provider' });
  }
};

exports.updateServiceProvider = async (req, res) => {
  const { id } = req.params;
  const { fullName, address, email, contact, profilePicture } = req.body;

  try {
    const serviceProvider = await ServiceProvider.findByPk(id);

    if (!serviceProvider) {
      return res.status(404).json({ error: 'Service provider not found' });
    }

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

exports.getAllServiceProviders = async (req, res) => {
  try {
    const serviceProviders = await ServiceProvider.findAll();
    res.status(200).json(serviceProviders);
  } catch (error) {
    console.error('❌ Error fetching service providers:', error);
    res.status(500).json({ error: 'Error fetching service providers' });
  }
};

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
