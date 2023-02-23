import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.API_URL || 'https://backend-score-management.onrender.com/api'
});

export default instance;
