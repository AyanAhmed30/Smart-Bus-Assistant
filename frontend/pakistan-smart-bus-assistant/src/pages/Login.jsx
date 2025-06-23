import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { AuthContext } from '../contexts/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Spinner from '../components/Spinner';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser(form);
      const { access, user } = res;
      login({ token: access, user });
      navigate(user.is_admin ? '/admin' : '/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px]">

        {/* Left Panel */}
        <div className="md:w-1/2 flex flex-col justify-center items-center bg-blue-600 text-white p-10 space-y-6">
          <div className="text-3xl font-cursive">Smart Bus Assistant</div>
          <h2 className="text-3xl font-bold">Welcome Aboard!</h2>
          <p className="text-center text-white/80">New here? Let’s get you set up for a smarter commute.</p>
          <Link
            to="/register"
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition duration-300"
          >
            SIGN UP
          </Link>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mb-4">Login</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Login now to access Smart Bus Assistant</p>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4 animate-shake">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
