import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Spinner from '../Spinner';
import { AuthContext } from '../../contexts/AuthContext'; // ✅ CORRECT PATH

import {
  FaHome,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaCommentDots,
  FaUser,
  FaSearch,
  FaBusAlt,
  FaRoute,
  FaClock,
  FaBars,
  FaTimes,
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

const ViewSchedules = () => {
  const { authData, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [schedulesRes, busesRes, routesRes] = await Promise.all([
          api.get('schedules/'),
          api.get('buses/'),
          api.get('routes/'),
        ]);
        setSchedules(schedulesRes.data);
        setBuses(busesRes.data);
        setRoutes(routesRes.data);
        setFilteredSchedules(schedulesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getBusNumber = (id) => buses.find((b) => b.id === id)?.bus_number || 'N/A';
  const getRouteName = (id) => routes.find((r) => r.id === id)?.name || 'N/A';

  useEffect(() => {
    const filtered = schedules.filter((item) => {
      const routeName = getRouteName(item.route).toLowerCase();
      const busNum = getBusNumber(item.bus).toLowerCase();
      return `${routeName} ${busNum}`.includes(search.toLowerCase());
    });
    setFilteredSchedules(filtered);
  }, [search, schedules, buses, routes]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 w-full">
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <h1 className="text-2xl text-blue-600 font-extrabold">Smart Bus Assistant</h1>

          {/* Center Nav */}
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

          {/* Desktop Logout */}
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
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-14 text-center w-full">
        <div className="px-4 md:px-20">
          <h2 className="text-4xl mb-3 font-extrabold">Bus Schedules</h2>
          <p className="text-lg font-light">
            Stay updated with real-time bus departures, plan your commute efficiently, and eliminate unexpected delays.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 md:px-20 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full">
          <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4 w-full">
            <FaBusAlt className="text-blue-600 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Total Buses</p>
              <p className="text-lg font-semibold text-gray-800">{buses.length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4 w-full">
            <FaRoute className="text-green-600 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Total Routes</p>
              <p className="text-lg font-semibold text-gray-800">{routes.length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4 w-full">
            <FaClock className="text-orange-500 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Total Schedules</p>
              <p className="text-lg font-semibold text-gray-800">{schedules.length}</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by route or bus number..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Table */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full overflow-x-auto shadow-md">
            <table className="min-w-full bg-white text-sm text-left border border-gray-200">
              <thead className="bg-blue-600 text-white uppercase tracking-wider text-xs">
                <tr>
                  <th className="py-3 px-4">Route</th>
                  <th className="py-3 px-4">Bus #</th>
                  <th className="py-3 px-4">Departure Time</th>
                  <th className="py-3 px-4">Weekdays</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <tr key={schedule.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="py-3 px-4">{getRouteName(schedule.route)}</td>
                      <td className="py-3 px-4">{getBusNumber(schedule.bus)}</td>
                      <td className="py-3 px-4">{schedule.departure_time}</td>
                      <td className="py-3 px-4">{schedule.weekdays}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500 font-medium">
                      No schedules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Why Use Section */}
        <section className="bg-white mt-16 p-8 rounded-xl shadow-md w-full">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Why Use Smart Bus Schedules?</h3>
          <p className="text-gray-700 mb-4">
            Whether you're a daily commuter or an occasional traveler, our intelligent bus schedule system is designed
            to make your journey smoother, smarter, and stress-free. No more long waits or guesswork!
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Real-time departure and route data at your fingertips.</li>
            <li>Quickly search schedules by bus number or route name.</li>
            <li>Plan better using weekday-based schedule visibility.</li>
            <li>Reduce travel uncertainty and save valuable time.</li>
          </ul>
        </section>
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

export default ViewSchedules;
