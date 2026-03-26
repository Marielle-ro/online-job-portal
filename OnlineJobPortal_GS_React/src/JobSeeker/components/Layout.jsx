// import { Home, User, Search, FileText } from 'lucide-react'
// import { NavLink } from 'react-router-dom'

// // const navItems = [
// //   { icon: Home, label: 'Home', path: '/' },
// //   { icon: User, label: 'Profile', path: '/profile' },
// //   { icon: Search, label: 'Job Search', path: '/job-search' },
// //   { icon: FileText, label: 'Applications', path: '/applications' },
// // ]

// const navItems = [
//   { icon: Home, label: 'Home', path: '/jobseeker/dashboard' },
//   { icon: User, label: 'Profile', path: '/jobseeker/dashboard/profile' },
//   { icon: Search, label: 'Job Search', path: '/jobseeker/dashboard/job-search' },
//   { icon: FileText, label: 'Applications', path: '/jobseeker/dashboard/applications' },
// ]

// function Layout2({ children }) {
//   return (
//     <div className="flex min-h-screen">
//       <nav className="w-64 bg-nav-bg p-4 space-y-2">
//         <div className="text-nav-text text-xl font-bold mb-8">Job Seeker</div>
//         {navItems.map(({ icon: Icon, label, path }) => (
//           <NavLink
//             key={path}
//             to={path}
//             className={({ isActive }) =>
//               `nav-link ${isActive ? 'active' : ''}`
//             }
//           >
//             <Icon size={20} />
//             <span>{label}</span>
//           </NavLink>
//         ))}
//       </nav>
//       <main className="flex-1 p-8 overflow-auto">
//         {children}
//       </main>
//     </div>
//   )
// }

// export default Layout2

import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, User, Search, FileText, LogOut } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/jobseeker/dashboard' },
  { icon: User, label: 'Profile', path: '/jobseeker/dashboard/profile' },
  { icon: Search, label: 'Job Search', path: '/jobseeker/dashboard/job-search' },
  { icon: FileText, label: 'Applications', path: '/jobseeker/dashboard/applications' },
];

function Layout2() {
  const navigate = useNavigate(); // Hook for navigation

  // Logout Function
  const handleLogout = () => {
    // Clear stored authentication data
    localStorage.removeItem('authToken'); // Remove auth token or session key
    sessionStorage.removeItem('userSession'); // Optional: clear session data

    // Redirect to login page
    navigate('/login'); // Ensure '/login' is your login route
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 h-screen bg-gray-800 text-gray-100 p-4 space-y-2 fixed left-0 top-0 flex flex-col">
        <div className="text-xl font-bold mb-8">Job Seeker</div>
        
        {/* Navigation Links */}
        <div className="flex-1 space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-700 text-white' // Active state
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white' // Default state
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-teal-600 hover:text-white w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout2;
