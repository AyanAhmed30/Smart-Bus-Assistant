import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBars, FaTimes, FaHome, FaClipboardList, FaMoneyCheckAlt, FaCommentDots, FaUser,
  FaLinkedin, FaGithub, FaGlobe, FaSun, FaMoon
} from 'react-icons/fa';
import axios from 'axios';

const navItems = [
  { icon: <FaHome size={20} />, link: '/dashboard', label: 'Home' },
  { icon: <FaClipboardList size={20} />, link: '/schedules', label: 'Schedules' },
  { icon: <FaMoneyCheckAlt size={20} />, link: '/fares', label: 'Fares' },
  { icon: <FaCommentDots size={20} />, link: '/complaints', label: 'Complaints' },
  { icon: <FaUser size={20} />, link: '/profile', label: 'Profile' },
];

const Profile = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // ensure token is stored after login
        const res = await axios.get('http://127.0.0.1:8000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  // Theme management
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl text-blue-600 dark:text-white font-extrabold">Smart Bus Assistant</h1>
          <div className="md:hidden">
            <button className="text-blue-600 dark:text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <nav className={`${menuOpen ? 'block' : 'hidden'} md:flex absolute md:static top-full left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent shadow md:shadow-none space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0`}>
            {navItems.map((item, idx) => (
              <Link key={idx} to={item.link} className="relative group text-blue-600 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition flex items-center justify-center">
                {item.icon}
                <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-max px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Profile Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Your Profile</h2>

        {user ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={user.name || 'N/A'}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Email</label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Password</label>
              <input
                type="password"
                value="************"
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded"
              />
            </div>

            <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
              <Link to="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline">Forgot Password?</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow"
              >
                Logout
              </button>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <h4 className="text-gray-800 dark:text-gray-300 font-semibold">Theme</h4>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white mt-16 w-full">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">Smart Bus Assistant</h4>
            <p className="text-gray-300">Your intelligent companion for hassle-free city travel.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/dashboard" className="hover:text-white">Home</Link></li>
              <li><Link to="/schedules" className="hover:text-white">Schedules</Link></li>
              <li><Link to="/fares" className="hover:text-white">Fares</Link></li>
              <li><Link to="/complaints" className="hover:text-white">Complaints</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="text-gray-300 space-y-2">
              <li>Email: ayan3092003@</li>
              <li>Phone: +92 310 2935352</li>
              <li>Karachi, Pakistan</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <div className="flex gap-4 text-gray-300">
              <a href="https://www.linkedin.com/in/hafizayanahmed/" target="_blank" rel="noopener noreferrer" className="hover:text-white text-xl"><FaLinkedin /></a>
              <a href="https://github.com/AyanAhmed30" target="_blank" rel="noopener noreferrer" className="hover:text-white text-xl"><FaGithub /></a>
              <a href="https://ayanahmed-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white text-xl"><FaGlobe /></a>
            </div>
          </div>
        </div>
        <div className="bg-blue-900 text-center py-4 text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Smart Bus Assistant. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Profile;
