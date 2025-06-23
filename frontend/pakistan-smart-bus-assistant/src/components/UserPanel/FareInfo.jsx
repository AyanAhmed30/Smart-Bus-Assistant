import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // ✅ CORRECT PATH

import { Link } from 'react-router-dom';
import axios from '../../services/api';
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

const FareInfo = () => {
  const { authData, logout } = useContext(AuthContext);
  
  const [fares, setFares] = useState([]);
  const [routesMap, setRoutesMap] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faresRes, routesRes] = await Promise.all([
          axios.get('fares/'),
          axios.get('routes/')
        ]);

        const routeDict = {};
        routesRes.data.forEach((route) => {
          routeDict[route.id] = route;
        });

        setRoutesMap(routeDict);
        setFares(faresRes.data);
      } catch (err) {
        console.error('Error fetching fare data:', err);
      }
    };

    fetchData();
  }, []);

  const filteredFares = fares.filter(({ route: routeId }) => {
    const route = routesMap[routeId] || {};
    const lower = searchTerm.toLowerCase();
    return (
      route.name?.toLowerCase().includes(lower) ||
      route.start_point?.toLowerCase().includes(lower) ||
      route.end_point?.toLowerCase().includes(lower)
    );
  });

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
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-14 px-6 shadow-md text-center">
        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">Fare Distribution Overview</h1>
        <p className="text-lg font-light">Explore fare details across routes to plan your trips better.</p>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Search */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Search Fare Information</h2>
          <input
            type="text"
            placeholder="Search by route name, source, or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Fare Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-blue-600 text-white text-xs uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Route</th>
                <th className="py-4 px-6">Start Point</th>
                <th className="py-4 px-6">End Point</th>
                <th className="py-4 px-6">Fare (PKR)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredFares.length > 0 ? (
                filteredFares.map(({ id, fare_amount, route: routeId }) => {
                  const route = routesMap[routeId] || {};
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <td className="py-4 px-6 font-medium text-gray-700">{route.name || 'N/A'}</td>
                      <td className="py-4 px-6 text-gray-600">{route.start_point || 'N/A'}</td>
                      <td className="py-4 px-6 text-gray-600">{route.end_point || 'N/A'}</td>
                      <td className="py-4 px-6 font-semibold text-blue-600">{fare_amount}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500 italic">
                    No fare data available at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Info Section */}
        <div className="bg-white mt-12 rounded-xl border-l-4 border-blue-600 shadow p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Why Check Fare Info?</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            Stay informed about fare charges before your ride. Fare transparency helps passengers plan ahead and manage their budget more effectively.
          </p>
        </div>
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

export default FareInfo;
