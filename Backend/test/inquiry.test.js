const request = require('supertest');
const path = require('path');
const Inquiry = require('../model/inquiry');

// Dynamically resolve `index.js` location (ensures correct import)
const app = require(path.join(__dirname, '../../index'));

// Mock the Inquiry model
jest.mock('../model/inquiry');

describe('Inquiry API Tests', () => {
  let inquiryData;

  beforeAll(() => {
    inquiryData = {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      subject: "Service Inquiry",
      message: "I need help with plumbing services."
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * 🟢 Test Creating a New Inquiry
   */
  it('should create a new inquiry', async () => {
    Inquiry.create.mockResolvedValue(inquiryData);

    const response = await request(app).post('/inquiries').send({
      name: "John Doe",
      email: "johndoe@example.com",
      subject: "Service Inquiry",
      message: "I need help with plumbing services."
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.message).toBe("Inquiry created successfully");
  });

  /**
   * 🔴 Test Creating an Inquiry with Missing Fields
   */
  it('should return error for missing required fields', async () => {
    const response = await request(app).post('/inquiries').send({
      name: "John Doe",
      email: "johndoe@example.com"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.message).toBe("Failed to create inquiry");
  });

  /**
   * 🟢 Test Fetching All Inquiries
   */
  it('should fetch all inquiries', async () => {
    Inquiry.findAll.mockResolvedValue([inquiryData]);

    const response = await request(app).get('/inquiries');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  /**
   * 🟢 Test Fetching a Single Inquiry by ID
   */
  it('should fetch an inquiry by ID', async () => {
    Inquiry.findByPk.mockResolvedValue(inquiryData);

    const response = await request(app).get('/inquiries/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data.name).toBe("John Doe");
  });

  /**
   * 🔴 Test Fetching an Inquiry with Invalid ID
   */
  it('should return error for non-existing inquiry ID', async () => {
    Inquiry.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/inquiries/999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.message).toBe("Inquiry not found");
  });

  /**
   * 🟢 Test Updating an Inquiry
   */
  it('should update an inquiry successfully', async () => {
    Inquiry.findByPk.mockResolvedValue(inquiryData);
    Inquiry.update = jest.fn().mockResolvedValue([1]); // Mocking update success

    const response = await request(app).put('/inquiries/1').send({
      subject: "Updated Service Inquiry"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.message).toBe("Inquiry updated successfully");
  });

  /**
   * 🔴 Test Updating a Non-Existing Inquiry
   */
  it('should return error when updating a non-existing inquiry', async () => {
    Inquiry.findByPk.mockResolvedValue(null);

    const response = await request(app).put('/inquiries/999').send({
      subject: "Updated Service Inquiry"
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.message).toBe("Inquiry not found");
  });

  /**
   * 🟢 Test Deleting an Inquiry
   */
  it('should delete an inquiry successfully', async () => {
    Inquiry.findByPk.mockResolvedValue(inquiryData);
    Inquiry.destroy = jest.fn().mockResolvedValue(1);

    const response = await request(app).delete('/inquiries/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.message).toBe("Inquiry deleted successfully");
  });

  /**
   * 🔴 Test Deleting a Non-Existing Inquiry
   */
  it('should return error when deleting a non-existing inquiry', async () => {
    Inquiry.findByPk.mockResolvedValue(null);

    const response = await request(app).delete('/inquiries/999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.message).toBe("Inquiry not found");
  });

});
