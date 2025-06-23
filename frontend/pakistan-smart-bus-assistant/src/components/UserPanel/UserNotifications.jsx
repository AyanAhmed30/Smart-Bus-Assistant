import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // ✅ CORRECT PATH
import api from '../../services/api';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaCommentDots,
  FaUser,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from 'react-icons/fa';

const navItems = [
  { icon: <FaHome size={20} />, link: '/dashboard', label: 'Home' },
  { icon: <FaClipboardList size={20} />, link: '/schedules', label: 'Schedules' },
  { icon: <FaMoneyCheckAlt size={20} />, link: '/fares', label: 'Fares' },
  { icon: <FaCommentDots size={20} />, link: '/complaints', label: 'Complaints' },
];

const UserNotifications = () => {
  const { authData, logout } = useContext(AuthContext);
  
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await api.get('notifications/');
        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const filtered = notifications.filter((note) =>
    note.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <h1 className="text-2xl text-blue-600 font-extrabold">Smart Bus Assistant</h1>

          {/* Centered Nav Items */}
          <nav className="flex-grow hidden md:flex justify-center space-x-6">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="relative group text-blue-600 hover:text-gray-700 transition flex items-center justify-center"
              >
                {item.icon}
                <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-max px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop Logout Button on Far Right */}
          {authData && (
            <button
              onClick={logout}
              className="ml-auto hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded transition duration-200"
            >
              Logout
            </button>
          )}

          {/* Hamburger Icon */}
          <div className="md:hidden ml-auto">
            <button className="text-blue-600 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Items */}
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:hidden bg-white shadow space-y-4 p-4`}
        >
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="flex items-center text-blue-600 hover:text-gray-700 transition"
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Link>
          ))}

          {/* Mobile Logout Button */}
          {authData && (
            <button
              onClick={logout}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded transition duration-200 w-full"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12 px-6 text-center shadow-md">
        <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">User Notifications</h2>
        <p className="text-lg font-light">Stay updated with the latest alerts and information.</p>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Notifications Table */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-blue-600 text-white uppercase">
                <tr>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((note) => (
                    <tr key={note.id} className="border-b hover:bg-gray-100 transition duration-150">
                      <td className="py-3 px-4">{note.message}</td>
                      <td className="py-3 px-4">{new Date(note.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-6 text-gray-500">
                      No notifications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white mt-16 w-full">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">Smart Bus Assistant</h4>
            <p className="text-gray-300">
              Your intelligent companion for hassle-free city travel, route guidance, and real-time bus insights.
            </p>
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
              <a href="https://www.linkedin.com/in/hafizayanahmed/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaLinkedin />
              </a>
              <a href="https://github.com/AyanAhmed30" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaGithub />
              </a>
              <a href="https://ayanahmed-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaGlobe />
              </a>
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

export default UserNotifications;
