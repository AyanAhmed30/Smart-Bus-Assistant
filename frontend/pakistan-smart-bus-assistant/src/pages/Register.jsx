import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { registerUser } from '../services/auth';
import Spinner from '../components/Spinner';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      const resError = err.response?.data;
      if (typeof resError === 'object') {
        const firstKey = Object.keys(resError)[0];
        setError(resError[firstKey]?.[0] || 'Registration failed');
      } else {
        setError('Registration failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Left Panel */}
        <div className="md:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-6 sm:p-8 space-y-5">
          <h1 className="text-xl sm:text-2xl font-bold text-center">Smart Bus Assistant</h1>
          <p className="text-sm sm:text-base text-white/90 text-center">Already have an account?</p>
          <Link
            to="/login"
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 text-sm"
          >
            Login
          </Link>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 w-full p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 text-center mb-3">Create Account</h2>

          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

            {/* Name */}
            <div className="flex items-center bg-gray-100 p-3 rounded-md">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* Email */}
            <div className="flex items-center bg-gray-100 p-3 rounded-md">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center bg-gray-100 p-3 rounded-md">
              <FaPhone className="text-gray-500 mr-3" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-gray-100 p-3 rounded-md">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center bg-gray-100 p-3 rounded-md">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition text-sm"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
