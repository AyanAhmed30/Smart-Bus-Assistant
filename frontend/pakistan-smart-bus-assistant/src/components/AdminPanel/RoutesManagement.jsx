import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Spinner from '../Spinner';
import Modal from '../Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmToast from '../ConfirmToast';

const RoutesManagement = () => {
  const { authData } = useContext(AuthContext);

  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    start_point: '',
    end_point: '',
    total_distance_km: '',
    estimated_time_min: '',
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchRoutes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('routes/');
      setRoutes(response.data);
    } catch (err) {
      setError('Failed to fetch routes.');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({
      id: null,
      name: '',
      start_point: '',
      end_point: '',
      total_distance_km: '',
      estimated_time_min: '',
    });
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (route) => {
    setFormData({
      id: route.id,
      name: route.name,
      start_point: route.start_point,
      end_point: route.end_point,
      total_distance_km: route.total_distance_km.toString(),
      estimated_time_min: route.estimated_time_min.toString(),
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const {
      name, start_point, end_point, total_distance_km, estimated_time_min
    } = formData;

    if (!name || !start_point || !end_point || !total_distance_km || !estimated_time_min) {
      toast.error('Please fill all fields');
      setActionLoading(false);
      return;
    }

    try {
      if (isEditing) {
        await api.put(`routes/${formData.id}/`, {
          name,
          start_point,
          end_point,
          total_distance_km: parseFloat(total_distance_km),
          estimated_time_min: parseInt(estimated_time_min, 10),
        });
        toast.success('Route updated successfully');
      } else {
        await api.post('routes/', {
          name,
          start_point,
          end_point,
          total_distance_km: parseFloat(total_distance_km),
          estimated_time_min: parseInt(estimated_time_min, 10),
        });
        toast.success('Route added successfully');
      }

      setModalOpen(false);
      fetchRoutes();
    } catch (err) {
      toast.error('Error saving route');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = (id) => {
    ConfirmToast({
      message: 'Are you sure you want to delete this route?',
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await api.delete(`routes/${id}/`);
          toast.success('Route deleted successfully');
          fetchRoutes();
        } catch (err) {
          toast.error('Error deleting route');
        } finally {
          setActionLoading(false);
        }
      },
      onCancel: () => {
        toast.info('Deletion cancelled');
      },
    });
  };

  const filteredRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-4">Routes Management</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by route name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center ml-4"
          onClick={openAddModal}
        >
          <FaPlus className="mr-2" /> Add Route
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-3">
            {isEditing ? 'Edit Route' : 'Add New Route'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Route Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="start_point" placeholder="Start Point" value={formData.start_point} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="end_point" placeholder="End Point" value={formData.end_point} onChange={handleChange} className="border p-2 rounded" required />
            <input type="number" name="total_distance_km" placeholder="Total Distance (km)" value={formData.total_distance_km} onChange={handleChange} className="border p-2 rounded" step="0.01" required />
            <input type="number" name="estimated_time_min" placeholder="Estimated Time (min)" value={formData.estimated_time_min} onChange={handleChange} className="border p-2 rounded" required />
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 mr-2" onClick={() => setModalOpen(false)} disabled={actionLoading}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={actionLoading}>
              {actionLoading ? <Spinner small /> : (isEditing ? 'Update Route' : 'Add Route')}
            </button>
          </div>
        </form>
      </Modal>

      {(loading || isSearching) ? (
        <div className="flex justify-center items-center h-48">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : filteredRoutes.length === 0 ? (
        <p>No routes found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow bg-white">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase">Start Point</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase">End Point</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase">Distance (km)</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase">Est. Time (min)</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-white uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredRoutes.map((route, idx) => (
                <tr key={route.id} className={`hover:bg-blue-50 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-6 py-4 text-gray-700">{route.name}</td>
                  <td className="px-6 py-4 text-gray-600">{route.start_point}</td>
                  <td className="px-6 py-4 text-gray-600">{route.end_point}</td>
                  <td className="px-6 py-4 text-gray-600">{route.total_distance_km}</td>
                  <td className="px-6 py-4 text-gray-600">{route.estimated_time_min}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => openEditModal(route)} className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800 transition" title="Edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(route.id)} className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition ml-2" title="Delete" disabled={actionLoading}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoutesManagement;
