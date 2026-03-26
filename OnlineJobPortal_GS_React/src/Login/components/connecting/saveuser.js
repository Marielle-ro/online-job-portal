import axios from 'axios';

const API_BASE_URL = "/api/auth/signup"; // ✅ no more localhost:8089

export const getUsers = async () => {
    return await axios.get(API_BASE_URL);
};

export const createUser = async (user) => {
    return await axios.post(API_BASE_URL, user, {
        headers: { "Content-Type": "application/json" }
    });
};