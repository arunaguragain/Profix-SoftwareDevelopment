import axios from 'axios';

const API_URL = 'http://localhost:5001';

const api = {
    // Inquiry APIs
    createInquiry: async (inquiryData) => {
        try {
            const response = await axios.post(`${API_URL}/inquiries/create`, inquiryData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getAllInquiries: async () => {
        try {
            const response = await axios.get(`${API_URL}/inquiries/all`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getInquiryById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/inquiries/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    updateInquiry: async (id, inquiryData) => {
        try {
            const response = await axios.put(`${API_URL}/inquiries/${id}`, inquiryData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    deleteInquiry: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/inquiries/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default api;