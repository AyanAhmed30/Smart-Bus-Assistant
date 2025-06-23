import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import Modal from '../Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Spinner from '../Spinner';

const BusesManagement = () => {
  const { authData } = useContext(AuthContext);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    plate_number: '',
    bus_number: '',
    capacity: '',
    route: '',
  });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('buses/');
      setBuses(response.data);
    } catch (err) {
      setError('Failed to fetch buses.');
    } finally {
      setLoading(false);
    }
  };

  const filteredBuses = buses.filter((bus) =>
    bus.bus_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setFormData({
      id: null,
      plate_number: '',
      bus_number: '',
      capacity: '',
      route: '',
    });
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (bus) => {
    setFormData({
      id: bus.id,
      plate_number: bus.plate_number || '',
      bus_number: bus.bus_number || '',
      capacity: bus.capacity.toString(),
      route: bus.route || '',
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

    if (!formData.plate_number || !formData.bus_number || !formData.capacity) {
      toast.error('Please fill all required fields.');
      return;
    }

    if (!authData?.user?.is_admin) {
      toast.error('You must be an admin to perform this action.');
      return;
    }

    setActionLoading(true);
    try {
      if (isEditing) {
        await api.put(`buses/${formData.id}/`, {
          plate_number: formData.plate_number,
          bus_number: formData.bus_number,
          capacity: parseInt(formData.capacity),
          route: formData.route || null,
        });
        toast.success('Bus updated successfully');
      } else {
        await api.post('buses/', {
          plate_number: formData.plate_number,
          bus_number: formData.bus_number,
          capacity: parseInt(formData.capacity),
          route: formData.route || null,
        });
        toast.success('Bus added successfully');
      }

      setModalOpen(false);
      fetchBuses();
    } catch (err) {
      toast.error('Error saving bus');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!authData?.user?.is_admin) {
      toast.error('You must be an admin to perform this action.');
      return;
    }

    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="mb-2">Are you sure you want to delete this bus?</p>
          <div className="flex justify-end gap-2">
            <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => closeToast()}>No</button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={async () => {
                closeToast();
                setActionLoading(true);
                try {
                  await api.delete(`buses/${id}/`);
                  toast.success('Bus deleted successfully');
                  fetchBuses();
                } catch (err) {
                  toast.error('Error deleting bus.');
                } finally {
                  setActionLoading(false);
                }
              }}
            >
              Yes
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-6">Buses Management</h2>

      {/* Search & Add Button in one line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        {/* Search Bar (Left) */}
        <div className="relative w-full sm:max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Bus Number..."
            value={searchTerm}
            onChange={(e) => {
              setSearching(true);
              setSearchTerm(e.target.value);
              setTimeout(() => setSearching(false), 300);
            }}
            className="pl-10 pr-4 py-2 border rounded w-full"
          />
        </div>

        {/* Add Button (Right) */}
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center whitespace-nowrap"
        >
          <FaPlus className="mr-2" /> Add Bus
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-3">
            {isEditing ? 'Edit Bus' : 'Add New Bus'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="plate_number" placeholder="Plate Number" value={formData.plate_number} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="bus_number" placeholder="Bus Number" value={formData.bus_number} onChange={handleChange} className="border p-2 rounded" required />
            <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="route" placeholder="Route (optional)" value={formData.route} onChange={handleChange} className="border p-2 rounded" />
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 mr-2" onClick={() => setModalOpen(false)} disabled={actionLoading}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={actionLoading}>
              {isEditing ? 'Update Bus' : 'Add Bus'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Table or Loading */}
      <div className="overflow-x-auto">
        {loading || searching ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filteredBuses.length === 0 ? (
          <p>No buses found.</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Plate Number</th>
                <th className="px-6 py-3 text-left">Bus Name</th>
                <th className="px-6 py-3 text-left">Capacity</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map((bus, idx) => (
                <tr key={bus.id} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-3">{bus.plate_number}</td>
                  <td className="px-6 py-3">{bus.bus_number}</td>
                  <td className="px-6 py-3">{bus.capacity}</td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <button
                      onClick={() => openEditModal(bus)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(bus.id)}
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

export default BusesManagement;
