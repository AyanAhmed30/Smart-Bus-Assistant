import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Spinner from '../Spinner';
import Modal from '../Modal';
import ConfirmToast from '../ConfirmToast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FaresManagement = () => {
  const { authData } = useContext(AuthContext);
  const [fares, setFares] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFares, setFilteredFares] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    route: '',
    fare_amount: '',
  });

  useEffect(() => {
    fetchFares();
    fetchRoutes();
  }, []);

  useEffect(() => {
    setSearching(true);
    const delay = setTimeout(() => {
      const filtered = fares.filter((f) =>
        f.route_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFares(filtered);
      setSearching(false);
    }, 300); // Debounce search

    return () => clearTimeout(delay);
  }, [searchTerm, fares]);

  const fetchFares = async () => {
    setLoading(true);
    try {
      const res = await api.get('fares/');
      setFares(res.data);
      setFilteredFares(res.data);
    } catch (err) {
      toast.error('Failed to fetch fares.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutes = async () => {
    try {
      const res = await api.get('routes/');
      setRoutes(res.data);
    } catch (err) {
      toast.error('Failed to fetch routes.');
    }
  };

  const openAddModal = () => {
    setFormData({ id: null, route: '', fare_amount: '' });
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (fare) => {
    setFormData({
      id: fare.id,
      route: fare.route,
      fare_amount: fare.fare_amount,
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authData?.user?.is_admin) {
      toast.error('Only admins can perform this action');
      return;
    }

    if (!formData.route || !formData.fare_amount) {
      toast.error('All fields are required');
      return;
    }

    setActionLoading(true);
    try {
      const payload = {
        route: formData.route,
        fare_amount: parseFloat(formData.fare_amount),
      };
      if (isEditing) {
        await api.put(`fares/${formData.id}/`, payload);
        toast.success('Fare updated successfully');
      } else {
        await api.post('fares/', payload);
        toast.success('Fare added successfully');
      }
      fetchFares();
      setModalOpen(false);
    } catch (err) {
      toast.error('Failed to save fare');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = (id) => {
    ConfirmToast({
      message: 'Are you sure you want to delete this fare?',
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await api.delete(`fares/${id}/`);
          toast.success('Fare deleted');
          fetchFares();
        } catch (err) {
          toast.error('Failed to delete fare');
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">Fares Management</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by route..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded shadow-sm"
          />
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        </div>

        <button
          onClick={openAddModal}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Fare
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Fare' : 'Add Fare'}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <select
              name="route"
              value={formData.route}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Route</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.start_point} → {r.end_point})
                </option>
              ))}
            </select>

            <input
              type="number"
              name="fare_amount"
              placeholder="Fare Amount"
              value={formData.fare_amount}
              onChange={handleChange}
              className="border p-2 rounded"
              step="0.01"
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 mr-2"
              disabled={actionLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={actionLoading}
            >
              {isEditing ? 'Update Fare' : 'Add Fare'}
            </button>
          </div>
        </form>
      </Modal>

      {(loading || actionLoading || searching) && <Spinner />}

      <div className="overflow-x-auto">
        {!loading && !searching && filteredFares.length === 0 ? (
          <p>No fares found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow bg-white">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-left">
              <tr>
                <th className="px-6 py-3">Route</th>
                <th className="px-6 py-3">Fare (Rs)</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFares.map((fare, idx) => (
                <tr
                  key={fare.id}
                  className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-6 py-3">{fare.route_name}</td>
                  <td className="px-6 py-3">Rs {fare.fare_amount}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => openEditModal(fare)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(fare.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                      disabled={actionLoading}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FaresManagement;
