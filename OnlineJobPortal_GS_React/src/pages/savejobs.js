// import axios from "axios";

// const API_BASE_URL = "http://localhost:8089/recruiter"; // URL for the recruiter section

// export const postJob = async (jobData) => {
//     try {
//         const response = await axios.post(
//             `${API_BASE_URL}/jobs`, 
//             jobData, // Send the job data directly in the request body
//             {
//                 headers: {
//                     "Content-Type": "application/json", // Ensure the content type is JSON
//                 }
//             }
//         );
//         return response.data; // Return the response data, e.g., "Job posted successfully"
//     } catch (error) {
//         console.error("Error posting job:", error.response?.data || error.message);
//         throw new Error(error.response?.data?.message || "Failed to post job.");
//     }
// };

// import axios from "axios";

// const API_BASE_URL = "http://localhost:8089/recruiter"; // URL for the recruiter section

// export const postJob = async (jobData) => {
//     try {
//         const response = await axios.post(
//             `${API_BASE_URL}/jobs`, 
//             jobData, // Send the job data directly in the request body
//             {
//                 headers: {
//                     "Content-Type": "application/json", // Ensure the content type is JSON
//                 }
//             }
//         );
//         return response.data; // Return the response data, e.g., "Job posted successfully"
//     } catch (error) {
//         console.error("Error posting job:", error.response?.data || error.message);
//         throw new Error(error.response?.data?.message || "Failed to post job.");
//     }
// };

// import axios from "axios";

// const API_BASE_URL = "http://localhost:8089/recruiter";

// export const postJob = async (jobData) => {
//     try {
//         const token = localStorage.getItem("authToken"); // Retrieve token from local storage or other storage
//         const response = await axios.post(
//             `${API_BASE_URL}/jobs`,
//             jobData,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`, // Add the Bearer token here
//                 },
//             }
//         );
//         return response.data; // Return the response data
//     } catch (error) {
//         console.error("Error posting job:", error.response?.data || error.message);
//         throw new Error(error.response?.data?.message || "Failed to post job.");
//     }
// };

// import axios from 'axios';

// export async function postJob(jobData) {
//     try {
//         const token = localStorage.getItem('authToken'); // Retrieve token from storage
//         const response = await axios.post('http://localhost:8089/recruiter/jobs', jobData, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//             },
//         });
//         return response;
//     } catch (error) {
//         console.error('Error posting job:', error);
//         throw error;
//     }
// }

// import axios from 'axios';

// export async function postJob(jobData) {
//     try {
//         const response = await axios.post('http://localhost:8089/recruiter/jobs', jobData, {
//             headers: {
//                 'Content-Type': 'application/json', // Ensure proper content type
//             },
//         });
//         return response; // Return the response object
//     } catch (error) {
//         console.error('Error posting job:', error);
//         throw error; // Re-throw error for higher-level handling
//     }
// }
//2
// import axios from 'axios';
// export const postJob = async (jobData) => {
//     // Log the exact data structure being sent
//     console.log('Job Data Structure:', {
//         title: jobData.title,
//         description: jobData.description,
//         minSalary: Number(jobData.salaryRange.min),
//         maxSalary: Number(jobData.salaryRange.max),
//         employmentType: jobData.employmentType,
//         location: jobData.location,
//         categoryId: jobData.categoryId,
//         recruiter: localStorage.getItem('userId'),
//         applicationDeadline: jobData.applicationDeadline
//     });

//     const formattedJobData = {
//         ...jobData,
//         minSalary: Number(jobData.salaryRange.min),
//         maxSalary: Number(jobData.salaryRange.max),
//         recruiter: localStorage.getItem('userId')
//     };

//     const response = await axios.post('http://localhost:8089/recruiter/jobs', formattedJobData);
//     return response.data;
// };



//888
import axios from 'axios';

export const postJob = async (jobData) => {
    console.log('Incoming job data:', jobData);

    const formattedJobData = {
        title: jobData.title,
        description: jobData.description,
        employmentType: jobData.employmentType,
        location: jobData.location,
        requirements: jobData.requirements,
        minSalary: Number(jobData.salaryRange?.min ?? 0),
        maxSalary: Number(jobData.salaryRange?.max ?? 0),
        categoryId: jobData.categoryId,
        applicationDeadline: jobData.applicationDeadline,
        recruiter: jobData.recruiter,
        postedDate: new Date().toISOString()
    };

    console.log('Formatted data:', formattedJobData);
    
    const response = await axios.post('http://localhost:8089/recruiter/jobs', formattedJobData);
    return response.data;
};



