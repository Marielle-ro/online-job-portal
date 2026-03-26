import axios from "axios";

const API_BASE_URL = "http://localhost:8089/auth";

// Direct login without OTP
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/login`,
            null,
            {
                params: {
                    username: credentials.username,
                    password: credentials.password
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error response:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Invalid username or password.");
    }
};

// 2FA verification
export const twoFactorVerification = async (username, otp) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/verify-2fa`, null, {
            params: { username, otp },
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data || "An error occurred while verifying OTP."
        );
    }
};

// Send OTP
export const sendOtp = async (username) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, null, {
            params: { username }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Failed to send OTP.");
    }
};