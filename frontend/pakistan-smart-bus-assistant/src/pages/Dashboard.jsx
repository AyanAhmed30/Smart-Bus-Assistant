import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react'; 
import SmartScrollButton from '../components/SmartScrollButton'; // adjust path if needed


import { AuthContext } from '../contexts/AuthContext';

// Inside your Dashboard component:
import {
  FaSearchLocation,
  FaBusAlt,
  FaUsers,
  FaMoneyBillAlt,
  FaBell,
  FaExclamationCircle,
  FaHome,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaCommentDots,
  FaUser,
  FaPlus,
  FaMinus,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const features = [
  { title: 'Search Routes', description: 'Find buses from source to destination.', icon: <FaSearchLocation size={28} className="text-blue-600" />, link: '/search-routes' },
  { title: 'View Schedules', description: 'Check timings for specific bus routes.', icon: <FaBusAlt size={28} className="text-blue-600" />, link: '/schedules' },
  { title: 'Capacity Status', description: 'See current bus occupancy level.', icon: <FaUsers size={28} className="text-blue-600" />, link: '/capacity' },
  { title: 'Fare Info', description: 'Know fare before you ride.', icon: <FaMoneyBillAlt size={28} className="text-blue-600" />, link: '/fares' },
  { title: 'Notifications', description: 'See schedule-based alerts here.', icon: <FaBell size={28} className="text-blue-600" />, link: '/notifications' },
  { title: 'Submit Complaint', description: 'Raise issues directly to admin.', icon: <FaExclamationCircle size={28} className="text-blue-600" />, link: '/complaints' },
];

const navItems = [
  { icon: <FaHome size={20} />, link: '/dashboard', label: 'Home' },
  { icon: <FaClipboardList size={20} />, link: '/schedules', label: 'Schedules' },
  { icon: <FaMoneyCheckAlt size={20} />, link: '/fares', label: 'Fares' },
  { icon: <FaCommentDots size={20} />, link: '/complaints', label: 'Complaints' },
];

const faqs = [
  {
    question: 'How can I find bus routes between two locations?',
    answer: 'Use the Search Routes feature to find available buses from your start point to destination.',
  },
  {
    question: 'How do I check bus occupancy?',
    answer: 'Click on the Capacity Status card to see the current bus occupancy level in real-time.',
  },
  {
    question: 'Where can I view bus fares?',
    answer: 'Visit the Fare Info section to view fare details for different routes.',
  },
  {
    question: 'How are complaints handled?',
    answer: 'All complaints are reviewed by the admin. You’ll be notified once it is resolved or closed.',
  },
  {
    question: 'Do I need to sign up to use the app?',
    answer: 'You can view most features without login, but complaints and personalized notifications require an account.',
  },
];

const Dashboard = () => {
const { authData, logout } = useContext(AuthContext);

  const [openIndex, setOpenIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };;

  return (
    <div className="min-h-screen flex flex-col">
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





      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12 text-center shadow-md">
        <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Redefining Public Transport</h2>
        <p className="text-lg font-light">Your one-stop solution for smart public transport</p>
      </section>

      {/* Dashboard Cards */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link
              to={feature.link}
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-blue-500 group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                  {feature.title}
                </h4>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Google Map Card */}
        <div className="mt-12 px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Envision Your Destination, Empower Your Journey</h3>

          <div
            onClick={() => document.getElementById('mapModal').showModal()}
            className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-blue-500 w-full max-w-7xl mx-auto"
          >
            <div className="p-6 text-center">
              <h4 className="text-lg font-semibold text-blue-600 mb-2">Track Real-Time City Routes and Locations</h4>
              <p className="text-sm text-gray-600 mb-4">Click to view live map in 3D mode</p>
              <img
                src="https://www.dignited.com/wp-content/uploads/2022/09/googleMapsTricksHero-1024x554.jpg"
                alt="3D Google Map"
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
          </div>
        </div>


        {/* Gallery */}
        <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800 text-center">City Bus Gallery</h3>
        <section className="grid md:grid-cols-3 gap-6">
          {/* Three image cards */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.vJR3wCIt8y1dRboyRX4L4wAAAA&pid=Api&P=0&h=220"
              alt="Modern Bus"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Modern City Buses</h4>
              <p className="text-sm text-gray-600">
                Explore how new buses and smart tools help reduce crowding and improve public experience.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
            <img
              src="https://arynews.tv/wp-content/uploads/2022/11/Peoples-Bus-Service-Hyderabad.jpg"
              alt="Hyderabad Bus"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Hyderabad Bus Service</h4>
              <p className="text-sm text-gray-600">
                Stay updated with reliable schedules and fare insights in your city.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
            <img
              src="https://www.listfunda.com/wp-content/uploads/2016/08/8453_864149037044941_5294801087373080235_n-768x511.jpg"
              alt="Karachi Transport"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Karachi Transport Upgrade</h4>
              <p className="text-sm text-gray-600">
                See how route planning and complaint resolution empower safer travel.
              </p>
            </div>
          </div>
        </section>
        {/* Why Use This Application */}
        <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-blue-600 mb-4">Why Use This Application?</h3>
            <p className="text-gray-600 text-lg mb-10 max-w-3xl mx-auto">
              Smart Bus Assistant is designed to enhance your public transport experience by providing reliable, real-time information to make your journey smoother, safer, and more efficient.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold text-blue-500 mb-2">Real-Time Route Tracking</h4>
                <p className="text-gray-700">
                  Stay informed with accurate route suggestions, live bus positions, and updates so you're never left waiting unnecessarily.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold text-blue-500 mb-2">Capacity Awareness</h4>
                <p className="text-gray-700">
                  Know how full a bus is before you board—making your travel more comfortable, especially during peak hours.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold text-blue-500 mb-2">Fare Transparency</h4>
                <p className="text-gray-700">
                  Plan your budget with upfront fare details for every route, eliminating surprises and confusion.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold text-blue-500 mb-2">Complaint Management</h4>
                <p className="text-gray-700">
                  Submit and track complaints easily. We ensure prompt action by forwarding issues to the respective authorities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold text-blue-500 mb-2">Schedule Notifications</h4>
                <p className="text-gray-700">
                  Receive timely alerts about route changes, delays, and new bus services—so you’re always updated.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold text-blue-500 mb-2">User-Friendly Interface</h4>
                <p className="text-gray-700">
                  Enjoy a clean, intuitive design that makes it simple for anyone to use—even first-time riders or non-tech users.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <h3 className="text-2xl font-semibold mt-16 mb-6 text-gray-800 text-center">Frequently Asked Questions</h3>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium hover:bg-gray-100"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Google Map Modal */}
      <dialog id="mapModal" className="rounded-md w-full max-w-4xl p-0">
        <div className="relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.295385816315!2d67.03428187497103!3d24.854684646968954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e3a86f59de3%3A0x3aa6e636678b8e9e!2sNED%20University%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2s!4v1719245042744!5m2!1sen!2s"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="rounded-t-md"
          ></iframe>
          <button
            onClick={() => document.getElementById('mapModal').close()}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      </dialog>
           <SmartScrollButton />

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

              <a href="https://www.linkedin.com/in/hafizayanahmed/ " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaLinkedin />
              </a>
              <a href="https://github.com/AyanAhmed30
" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaGithub />
              </a>
              <a href="https://ayanahmed-portfolio.netlify.app/
" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
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

export default Dashboard;
