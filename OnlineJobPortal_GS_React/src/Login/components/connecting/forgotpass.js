import axios from 'axios';

// Define base URL for your backend
const API_BASE_URL = "http://localhost:8089/auth";

// // API call to request a password reset
// export const requestPasswordReset = async (username) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/forgot-password`, { username: username });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || "An error occurred while processing your request.";
//     }
// };

// export const requestPasswordReset = async (username) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/forgot-password?username=${encodeURIComponent(username)}`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || "An error occurred while processing your request.";
//     }
// };


// // API call to reset the password
// export const resetPassword = async (email, token, newPassword) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/reset-password`, {
//             username: email,
//             token: token,
//             newPassword: newPassword,
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || "An error occurred while resetting your password.";
//     }
// };

// Request password reset
export const requestPasswordReset = async (username) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot-password?username=${encodeURIComponent(username)}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || "An error occurred while processing your request.";
    }
};

// Reset password with token
export const resetPassword = async (username, token, newPassword) => {
    try {
        // Send the data as request parameters in the URL
        const response = await axios.post(`${API_BASE_URL}/reset-password`, null, {
            params: {
                username: username,
                token: token,
                newPassword: newPassword,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "An error occurred while resetting your password.";
    }
};

