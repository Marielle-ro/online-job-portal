// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Layout } from './components/layout/Layout';
// import { HomePage } from './pages/HomePage';
// import { ProfilePage } from './pages/ProfilePage';
// import { JobPostingsPage } from './pages/JobPostingsPage';
// import { ApplicationsPage } from './pages/ApplicationsPage';
// import { ShortlistedPage } from './pages/ShortlistedPage';
// import { MessagesPage } from './pages/MessagesPage';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<HomePage />} />
//           <Route path="profile" element={<ProfilePage />} />
//           <Route path="jobs" element={<JobPostingsPage />} />
//           <Route path="applications" element={<ApplicationsPage />} />
//           <Route path="shortlisted" element={<ShortlistedPage />} />
//           <Route path="messages" element={<MessagesPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Layout } from './components/layout/Layout';
// import { HomePage } from './pages/HomePage';
// import { ProfilePage } from './pages/ProfilePage';
// import { JobPostingsPage } from './pages/JobPostingsPage';
// import { ApplicationsPage } from './pages/ApplicationsPage';
// import { ShortlistedPage } from './pages/ShortlistedPage';
// import { MessagesPage } from './pages/MessagesPage';
// import LoginPage from './Login/components/LoginPage';
// import SignupPage from './Login/components/SignUpPage';
// import ForgotPasswordPage from './Login/components/forgot-password-form';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes (Login, Signup, Forgot Password) */}
//         <Route path="/layout" element={<LoginPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />

//         {/* Protected Routes (Require Layout) */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<HomePage />} />
//           <Route path="profile" element={<ProfilePage />} />
//           <Route path="jobs" element={<JobPostingsPage />} />
//           <Route path="applications" element={<ApplicationsPage />} />
//           <Route path="shortlisted" element={<ShortlistedPage />} />
//           <Route path="messages" element={<MessagesPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import LoginPage from "./Login/components/LoginPage";
// import SignupPage from "./Login/components/SignUpPage";
// import ForgotPasswordPage from "./Login/components/forgot-password-form";
// import { Layout } from './components/layout/Layout';
// import { HomePage } from './pages/HomePage';
// import { ProfilePage } from './pages/ProfilePage';
// import { JobPostingsPage } from './pages/JobPostingsPage';
// import { ApplicationsPage } from './pages/ApplicationsPage';
// import { ShortlistedPage } from './pages/ShortlistedPage';
// import { MessagesPage } from './pages/MessagesPage';

// function App() {
//   const isAuthenticated = false; // Replace with actual authentication logic

//   return (
//     <Router>
//       <Routes>
//         {/* Default route - Redirect to login page if not authenticated */}
//         <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />
        
//         {/* Authentication routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
//         {/* Main app routes */}
//         <Route path="/home" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
//           <Route index element={<HomePage />} />
//           <Route path="profile" element={<ProfilePage />} />
//           <Route path="jobs" element={<JobPostingsPage />} />
//           <Route path="applications" element={<ApplicationsPage />} />
//           <Route path="shortlisted" element={<ShortlistedPage />} />
//           <Route path="messages" element={<MessagesPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// //was working
// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import LoginPage from "./Login/components/LoginPage";
// import SignupPage from "./Login/components/SignUpPage";
// import ForgotPasswordPage from "./Login/components/forgot-password-form";
// import { Layout } from './components/layout/Layout';
// import { HomePage } from './pages/HomePage';
// import { ProfilePage } from './pages/ProfilePage';
// import { JobPostingsPage } from './pages/JobPostingsPage';
// import { ApplicationsPage } from './pages/ApplicationsPage';
// import { ShortlistedPage } from './pages/ShortlistedPage';
// import { MessagesPage } from './pages/MessagesPage';

// // Import dashboards
// // import JobSeekerDashboard from "./pages/JobSeekerDashboard";
// // import RecruiterDashboard from "./pages/RecruiterDashboard";

// // Simulated authentication and role logic
// const isAuthenticated = localStorage.getItem("authToken");
// const userRole = localStorage.getItem("userRole"); // 'jobseeker' or 'recruiter'

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route - Redirect based on authentication */}
//         <Route 
//           path="/" 
//           element={
//             isAuthenticated ? 
//               (userRole === "RECRUITER" ? <Navigate to="/recruiter*/" /> : <Navigate to="/layout/Layout" />) 
//               : <LoginPage />
//           } 
//         />
        
//         {/* Authentication routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />

//         {/* Jobseeker Dashboard */}
//         <Route
//           path="/layout/Layout"
//           element={
//             isAuthenticated && userRole === "JOB_SEEKER" ? <JobSeekerDashboard /> : <Navigate to="/login" />
//           }
//         />

//         {/* Recruiter Dashboard */}
//         <Route
//           path="/recruiter/*"
//           element={
//             isAuthenticated && userRole === "RECRUITER" ? <RecruiterDashboard /> : <Navigate to="/login" />
//           }
//         />

//         {/* Main app routes for authenticated users */}
//         <Route 
//           path="/recruiter*" 
//           element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
//         >
//           <Route path="home" element={<HomePage />} />
//           <Route path="profile" element={<ProfilePage />} />
//           <Route path="jobs" element={<JobPostingsPage />} />
//           <Route path="applications" element={<ApplicationsPage />} />
//           <Route path="shortlisted" element={<ShortlistedPage />} />
//           <Route path="messages" element={<MessagesPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

//we try
// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import LoginPage from "./Login/components/LoginPage";
// import SignupPage from "./Login/components/SignUpPage";

// // Dashboard Pages
// import HomePage from "./pages/HomePage";
// import ProfilePage from "./pages/ProfilePage";
// import JobPostingsPage from "./pages/JobPostingsPage";
// import ApplicationsPage from "./pages/ApplicationsPage";
// import ShortlistedPage from "./pages/ShortlistedPage";
// import MessagesPage from "./pages/MessagesPage";

// import Layout2 from "./JobSeeker/components/Layout";
// import Home from './JobSeeker/pages/Home'
// import Profile from './JobSeeker/pages/Profile'
// import JobSearch from './JobSeeker/pages/JobSearch'
// import Applications from './JobSeeker/pages/Applications'
// // import ErrorBoundary from './components/ErrorBoundary'



// // Layout & Sidebar
// import { Layout } from "./components/layout/Layout";


// // Simulated authentication logic
// const isAuthenticated = localStorage.getItem("authToken");
// const userRole = localStorage.getItem("userRole"); // This can be "JOB_SEEKER" or "RECRUITER"

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route - Redirect based on authentication and role */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               userRole === "RECRUITER" ? (
//                 <Navigate to="/recruiter/dashboard" />
//               ) : userRole === "JOB_SEEKER" ? (
//                 <Navigate to="/jobseeker/dashboard" />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             ) : (
//               <LoginPage />
//             )
//           }
//         />

//         {/* Authentication Routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />

//         {/* Job Seeker Dashboard Route */}
//         <Route 
//           path="/jobseeker/dashboard"
//           element={
//             isAuthenticated && userRole === "JOB_SEEKER" ? (
//               <Layout />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         > 
//           {/* Nested routes for jobseeker dashboard */}
//           <Route path="/" element={<Home />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/job-search" element={<JobSearch />} />
//           <Route path="/applications" element={<Applications />} />
        
//         </Route>

//         {/* Recruiter Dashboard Route */}
//         <Route
//           path="/recruiter/dashboard"
//           element={
//             isAuthenticated && userRole === "RECRUITER" ? (
//               <Layout />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         >
//           {/* Nested routes for recruiter dashboard */}
//           <Route index element={<HomePage />} />
//           <Route path="profile" element={<ProfilePage />} />
//           <Route path="jobs" element={<JobPostingsPage />} />
//           <Route path="applications" element={<ApplicationsPage />} />
//           <Route path="shortlists" element={<ShortlistedPage />} />
//           <Route path="messages" element={<MessagesPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;



//broooooooo/ hooks error 
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "./Login/components/LoginPage";
// import SignupPage from "./Login/components/SignUpPage";

// // Dashboard Pages for Recruiter
// import HomePage from "./pages/HomePage";
// import ProfilePage from "./pages/ProfilePage";
// import JobPostingsPage from "./pages/JobPostingsPage";
// import ApplicationsPage from "./pages/ApplicationsPage";
// import ShortlistedPage from "./pages/ShortlistedPage";
// import MessagesPage from "./pages/MessagesPage";

// // Dashboard Pages for Job Seeker
// import Home from "./JobSeeker/pages/Home";
// import Profile from "./JobSeeker/pages/Profile";
// import JobSearch from "./JobSeeker/pages/JobSearch";
// import Applications from "./JobSeeker/pages/Applications";

// // Layouts
// import { Layout } from "./components/layout/Layout"; // Recruiter Layout
// import Layout2 from "./JobSeeker/components/Layout";

// function App() {
//   // Retrieve values dynamically for fresh checks
//   const isAuthenticated = localStorage.getItem("authToken");
//   const userRole = localStorage.getItem("userRole"); // "JOB_SEEKER" or "RECRUITER"

//   return (
//     <Router>
//       <Routes>
//         {/* Default Route - Redirect based on Role */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               userRole === "RECRUITER" ? (
//                 <Navigate to="/recruiter/dashboard" replace />
//               ) : userRole === "JOB_SEEKER" ? (
//                 <Navigate to="/jobseeker/dashboard" replace />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Authentication Routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />

//         {/* Job Seeker Dashboard */}
//         <Route
//           path="/jobseeker/dashboard/*"
//           element={
//             isAuthenticated && userRole === "JOB_SEEKER" ? (
//               <Layout2 />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         >
//           <Route index element={<Home />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="job-search" element={<JobSearch />} />
//           <Route path="applications" element={<Applications />} />
//         </Route>

//         {/* Recruiter Dashboard */}
//         <Route
//           path="/recruiter/dashboard/*"
//           element={
//             isAuthenticated && userRole === "RECRUITER" ? (
//               <Layout />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         >
//           <Route index element={<HomePage />} />
//           <Route path="profile" element={<ProfilePage />} />
//           <Route path="jobs" element={<JobPostingsPage />} />
//           <Route path="applications" element={<ApplicationsPage />} />
//           <Route path="shortlists" element={<ShortlistedPage />} />
//           <Route path="messages" element={<MessagesPage />} />
//         </Route>

//         {/* Catch-All Route */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


//another one
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./Login/components/LoginPage";
import SignupPage from "./Login/components/SignUpPage";
import ForgotPasswordPage from "./Login/components/forgot-password-form";


// Dashboard Pages for Recruiter
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import JobPostingsPage from "./pages/JobPostingsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ShortlistedPage from "./pages/ShortlistedPage";
import MessagesPage from "./pages/MessagesPage";
import InterviewsPage from "./pages/InterviewsPage";
import AcceptedPage from "./pages/AcceptedPage";

// Dashboard Pages for Job Seeker
import Home from "./JobSeeker/pages/Home";
import Profile from "./JobSeeker/pages/Profile";
import JobSearch from "./JobSeeker/pages/JobSearch";
import Applications from "./JobSeeker/pages/Applications";

// Layouts
import { Layout } from "./components/layout/Layout"; // Recruiter Layout
import Layout2 from "./JobSeeker/components/Layout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    if (authToken && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default Route - Redirect based on Role */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              userRole === "RECRUITER" ? (
                <Navigate to="/recruiter/dashboard" replace />
              ) : userRole === "JOB_SEEKER" ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Job Seeker Dashboard */}
        <Route
          path="/jobseeker/dashboard/*"
          element={
            // isAuthenticated && userRole === "JOB_SEEKER" ? (
              <Layout2 />
            // ) : (
            //   <Navigate to="/login" replace />
            // )
          }
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="job-search" element={<JobSearch />} />
          <Route path="applications" element={<Applications />} />
        </Route>

{/* <Route
  path="/jobseeker/dashboard/"
  element={
    // isAuthenticated && userRole === "JOB_SEEKER" ? (
      <Layout2>
        <Routes>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="job-search" element={<JobSearch />} />
          <Route path="applications" element={<Applications />} />
        </Routes>
      </Layout2>
    // ) : (
    //   <Navigate to="/login" replace />
    // )
  }
/> */}

        
        {/* Recruiter Dashboard */}
        <Route
          path="/recruiter/dashboard/*"
          element={
            isAuthenticated && userRole === "RECRUITER" ? (
              <Layout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="jobs" element={<JobPostingsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="shortlisted" element={<ShortlistedPage />} />
          <Route path="accepted" element={<AcceptedPage />} />
          <Route path="interviews" element={<InterviewsPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>

{/* <Route path="/recruiter/dashboard/*" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="jobs" element={<JobPostingsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="shortlisted" element={<ShortlistedPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route> */}

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

