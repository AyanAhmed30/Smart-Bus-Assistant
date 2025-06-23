import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // ✅ CORRECT PATH

import { Link } from 'react-router-dom';
import {
  FaBars, FaTimes, FaHome, FaClipboardList, FaMoneyCheckAlt,
  FaCommentDots, FaUser, FaLinkedin, FaGithub, FaGlobe,
} from 'react-icons/fa';
import api from '../../services/api';
import Spinner from '../Spinner';
import ComplaintModal from '../ComplaintModal';

const navItems = [
  { icon: <FaHome size={20} />, link: '/dashboard', label: 'Home' },
  { icon: <FaClipboardList size={20} />, link: '/schedules', label: 'Schedules' },
  { icon: <FaMoneyCheckAlt size={20} />, link: '/fares', label: 'Fares' },
  { icon: <FaCommentDots size={20} />, link: '/complaints', label: 'Complaints' },
];

const UserComplaints = () => {
  const { authData, logout } = useContext(AuthContext);
  const [buses, setBuses] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [busRes, complaintRes] = await Promise.all([
          api.get('buses/'),
          api.get('complaints/'),
        ]);
        setBuses(busRes.data);
        setComplaints(complaintRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBusNumber = (busId) => {
    return buses.find((bus) => bus.id === busId)?.bus_number || 'Unknown';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center relative">
          <h1 className="text-2xl text-blue-600 font-extrabold">Smart Bus Assistant</h1>

          {/* Centered nav */}
          <nav className="flex-grow hidden md:flex justify-center space-x-6">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="relative group text-blue-600 hover:text-gray-700 transition flex items-center justify-center"
              >
                {item.icon}
                <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-max px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition z-50">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Logout button (right aligned) */}
          {authData && (
            <button
              onClick={logout}
              className="absolute right-6 hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded transition"
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

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden bg-white shadow space-y-4 p-4">
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
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded w-full"
              >
                Logout
              </button>
            )}
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-10 px-6 text-center shadow-md">
        <h2 className="text-4xl font-bold drop-shadow-lg">User Complaints</h2>
        <p className="text-lg font-light mt-2">Submit and view your complaints for better service</p>
      </section>

      {/* Main Section */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Complaints</h3>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Complaint
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4">Bus #</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-gray-100">
                      <td className="py-3 px-4">{getBusNumber(c.bus)}</td>
                      <td className="py-3 px-4">{c.description}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          c.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : c.status === 'Resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{c.created_at ? new Date(c.created_at).toLocaleString() : 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No complaints submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Complaint Modal */}
      {showModal && (
        <ComplaintModal
          buses={buses}
          onClose={() => setShowModal(false)}
          onSubmitted={() => {
            setShowModal(false);
            setTimeout(() => {
              // Refetch after modal closes
              api.get('complaints/').then(res => setComplaints(res.data));
            }, 500);
          }}
        />
      )}

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

export default UserComplaints;
