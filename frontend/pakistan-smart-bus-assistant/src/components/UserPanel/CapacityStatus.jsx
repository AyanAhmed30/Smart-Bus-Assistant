import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext'; // ✅ CORRECT PATH
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Spinner from '../Spinner';

import {
  FaBus,
  FaSearch,
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

const CapacityStatus = () => {
  const { authData, logout } = useContext(AuthContext);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [busRes, routeRes] = await Promise.all([
          api.get('buses/'),
          api.get('routes/'),
        ]);
        setBuses(busRes.data);
        setRoutes(routeRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getRouteName = (routeId) => {
    const route = routes.find((r) => r.id === routeId);
    return route ? `${route.name} (${route.start_point} → ${route.end_point})` : 'N/A';
  };

  const filtered = buses.filter((bus) => {
    const routeName = getRouteName(bus.route || '').toLowerCase();
    return (
      bus.bus_number.toLowerCase().includes(search.toLowerCase()) ||
      routeName.includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <h1 className="text-2xl text-blue-600 font-extrabold">Smart Bus Assistant</h1>

          <nav className="flex-grow hidden md:flex justify-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
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

          {authData && (
            <button
              onClick={logout}
              className="ml-auto hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded transition duration-200"
            >
              Logout
            </button>
          )}

          <div className="md:hidden ml-auto">
            <button className="text-blue-600 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:hidden bg-white shadow space-y-4 p-4`}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
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
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-14 px-6 shadow-md">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">Bus Capacity Overview</h1>
          <p className="text-lg font-light">
            Monitor real-time bus occupancy levels to make informed travel decisions and avoid overcrowded vehicles.
            By accessing up-to-date capacity data, you can plan your journey more efficiently, ensure a more comfortable
            ride, and enhance your overall commuting experience with confidence and convenience.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by bus number or route name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-blue-600 text-white uppercase">
                <tr>
                  <th className="py-3 px-4">Bus #</th>
                  <th className="py-3 px-4">Plate #</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4">Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((bus) => (
                    <tr key={bus.id} className="border-b hover:bg-gray-100 transition duration-150">
                      <td className="py-3 px-4 font-medium text-blue-700 flex items-center gap-2">
                        <FaBus className="text-blue-500" /> {bus.bus_number}
                      </td>
                      <td className="py-3 px-4">{bus.plate_number}</td>
                      <td className="py-3 px-4">{bus.capacity}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                            bus.current_occupancy >= bus.capacity
                              ? 'bg-red-600'
                              : bus.current_occupancy >= bus.capacity * 0.75
                              ? 'bg-yellow-500'
                              : 'bg-green-600'
                          }`}
                        >
                          {bus.current_occupancy}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No buses found for this search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-white mt-12 rounded-xl border-l-4 border-blue-600 shadow p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Why Monitor Bus Capacity?</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            Knowing live occupancy levels helps you avoid overcrowded buses and improves your journey experience.
            This feature allows passengers to make informed decisions by viewing real-time data about available space,
            optimizing route selection and personal comfort.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-blue-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">Smart Bus Assistant</h4>
            <p className="text-gray-300">Your intelligent companion for hassle-free city travel and real-time insights.</p>
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

export default CapacityStatus;
