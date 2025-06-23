import React, { useEffect, useState, useContext } from 'react'; // ✅ Combined correctly
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Spinner from '../Spinner';
import { AuthContext } from '../../contexts/AuthContext'; // ✅ CORRECT PATH

// Icons
import {
  FaRoute,
  FaMapMarkedAlt,
  FaClock,
  FaRoad,
  FaBars,
  FaTimes,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaHome,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaCommentDots,
  FaUser,
} from 'react-icons/fa';

const navItems = [
  { icon: <FaHome size={20} />, link: '/dashboard', label: 'Home' },
  { icon: <FaClipboardList size={20} />, link: '/schedules', label: 'Schedules' },
  { icon: <FaMoneyCheckAlt size={20} />, link: '/fares', label: 'Fares' },
  { icon: <FaCommentDots size={20} />, link: '/complaints', label: 'Complaints' },
];

const SearchRoutes = () => {
  const { authData, logout } = useContext(AuthContext);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await api.get('routes/');
        setRoutes(res.data);
      } catch (err) {
        console.error('Failed to fetch routes', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  const filteredRoutes = routes.filter((route) => {
    const query = searchQuery.toLowerCase();
    return (
      route.name.toLowerCase().includes(query) ||
      route.start_point.toLowerCase().includes(query) ||
      route.end_point.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
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

          {/* Desktop Logout Button */}
          {authData && (
            <button
              onClick={logout}
              className="ml-auto hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded transition duration-200"
            >
              Logout
            </button>
          )}

          {/* Hamburger */}
          <div className="md:hidden ml-auto">
            <button className="text-blue-600 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow space-y-4 p-4`}>
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

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 px-6 shadow-md">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Explore City Routes</h1>
          <p className="text-lg font-light tracking-wide">
            Plan your daily commute or travel across town by exploring live route data.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by route name, source or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Info */}
        <div className="bg-white rounded-xl border-l-4 border-blue-600 shadow-md p-6 mb-12">
          <h2 className="text-xl font-semibold text-blue-600 mb-1">Why Use This Feature?</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Whether you're a regular commuter or visiting a new part of the city, the route search tool
            gives you access to real-time route information, travel durations, and connectivity — ensuring
            you're always on the fastest path forward.
          </p>
        </div>

        {/* Routes */}
        {loading ? (
          <Spinner />
        ) : filteredRoutes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-blue-600 shadow hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <FaRoute className="text-blue-500" /> {route.name}
                </h3>
                <p className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <FaMapMarkedAlt className="text-green-600" />
                  <strong>From:</strong> {route.start_point}
                </p>
                <p className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <FaMapMarkedAlt className="text-red-600 rotate-180" />
                  <strong>To:</strong> {route.end_point}
                </p>
                <p className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <FaRoad className="text-indigo-600" />
                  <strong>Distance:</strong> {route.total_distance_km} km
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <FaClock className="text-yellow-600" />
                  <strong>Estimated Time:</strong> {route.estimated_time_min} min
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm mt-20">
            No matching routes found for your search query.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white mt-16">
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
              <li>Email: ayan3092003@gmail.com</li>
              <li>Phone: +92 310 2935352</li>
              <li>Karachi, Pakistan</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <div className="flex gap-4 text-gray-300">
              <a href="https://www.linkedin.com/in/hafizayanahmed/" target="_blank" rel="noopener noreferrer" className="hover:text-white text-xl">
                <FaLinkedin />
              </a>
              <a href="https://github.com/AyanAhmed30" target="_blank" rel="noopener noreferrer" className="hover:text-white text-xl">
                <FaGithub />
              </a>
              <a href="https://ayanahmed-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white text-xl">
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

export default SearchRoutes;
