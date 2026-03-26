import axios from 'axios';

// Base Axios Instance
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8089', // Replace with your backend URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8089', // Backend URL
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensure cookies or Authorization headers are included in requests
  });
  
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8089',  // Adjust this to your backend URL
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//     withCredentials: true,  // If you're using cookies, this helps with session management
//   });
  


// Fetch recruiter profile
export const getRecruiterProfile = async (userId) => {
    try {
      const response = await axiosInstance.get(`/recruiter/recruiter_profile/me?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recruiter profile:', error);
      throw error;
    }
  };
  

// Update recruiter profile
export const updateRecruiterProfile = async (profileData) => {
  try {
    const response = await axiosInstance.post('/recruiter/recruiter_profile', profileData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating recruiter profile:', error);
    throw error;
  }
};
