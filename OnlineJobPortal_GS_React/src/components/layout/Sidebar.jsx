import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  UserCircle, 
  Briefcase, 
  ClipboardList, 
  Star, 
  MessageSquare,
  CalendarClock,
  LogOut
} from 'lucide-react';
import { CheckCircle } from 'lucide-react';

// const navItems = [
//   { icon: Home, label: 'Home', path: '/' },
//   { icon: UserCircle, label: 'Profile', path: '/profile' },
//   { icon: Briefcase, label: 'Job Postings', path: '/jobs' },
//   { icon: ClipboardList, label: 'Applications', path: '/applications' },
//   { icon: Star, label: 'Shortlisted', path: '/shortlisted' },
//   { icon: MessageSquare, label: 'Messages', path: '/messages' },
// ];

const navItems = [
  { icon: Home, label: 'Home', path: '/recruiter/dashboard' },
  { icon: UserCircle, label: 'Profile', path: '/recruiter/dashboard/profile' },
  { icon: Briefcase, label: 'Job Postings', path: '/recruiter/dashboard/jobs' },
  { icon: ClipboardList, label: 'Applications', path: '/recruiter/dashboard/applications' },
  { icon: Star, label: 'Shortlisted', path: '/recruiter/dashboard/shortlisted' },
  { icon: CheckCircle, label: 'Accepted', path: '/recruiter/dashboard/accepted' },
  { icon: CalendarClock, label: 'Interviews', path: '/recruiter/dashboard/interviews' },
  { icon: MessageSquare, label: 'Messages', path: '/recruiter/dashboard/messages' },
];


// const navItems = [
//   { icon: Home, label: 'Home', path: '/' },
//   { icon: UserCircle, label: 'Profile', path: './pages/ProfilePage' },
//   { icon: Briefcase, label: 'Job Postings', path: './pages/JobPostingsPage' },
//   { icon: ClipboardList, label: 'Applications', path: './pages/ApplicationsPage' },
//   { icon: Star, label: 'Shortlisted', path: './pages/ShortlistedPage' },
//   { icon: MessageSquare, label: 'Messages', path: './pages/MessagesPage' },
// ];

export function Sidebar() {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    // Clear stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    sessionStorage.clear();

    // Redirect to login page
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-gray-800 text-gray-100 fixed left-0 top-0 flex flex-col">
      <div className="p-4 flex-1 flex flex-col">
        <h1 className="text-xl font-bold mb-8">Recruiter Dashboard</h1>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-teal-600 hover:text-white w-full mt-4"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}