import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Spinner from '../Spinner';
import Modal from '../Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmToast from '../ConfirmToast';

const SchedulesManagement = () => {
  const { authData } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    bus: '',
    route: '',
    departure_time: '',
    weekdays: '',
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
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
    } catch (err) {
      setError('Failed to fetch schedule data.');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({ id: null, bus: '', route: '', departure_time: '', weekdays: '' });
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (schedule) => {
    setFormData({
      id: schedule.id,
      bus: schedule.bus,
      route: schedule.route,
      departure_time: schedule.departure_time,
      weekdays: schedule.weekdays,
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
    setActionLoading(true);

    if (!formData.bus || !formData.route || !formData.departure_time || !formData.weekdays) {
      toast.error('Please fill all fields');
      setActionLoading(false);
      return;
    }

    try {
      if (isEditing) {
        await api.put(`schedules/${formData.id}/`, formData);
        toast.success('Schedule updated successfully');
      } else {
        await api.post('schedules/', formData);
        toast.success('Schedule added successfully');
      }
      setModalOpen(false);
      fetchAllData();
    } catch (err) {
      toast.error('Error saving schedule');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = (id) => {
    ConfirmToast({
      message: 'Are you sure you want to delete this schedule?',
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await api.delete(`schedules/${id}/`);
          toast.success('Schedule deleted successfully');
          fetchAllData();
        } catch (err) {
          toast.error('Error deleting schedule');
        } finally {
          setActionLoading(false);
        }
      },
      onCancel: () => toast.info('Deletion cancelled'),
    });
  };

  const filteredSchedules = schedules.filter((s) => {
    const bus = buses.find((b) => b.id === s.bus)?.bus_number || '';
    const route = routes.find((r) => r.id === s.route)?.name || '';
    return bus.toLowerCase().includes(searchTerm.toLowerCase()) ||
           route.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">Schedule Management</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by bus or route..."
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
          <FaPlus className="mr-2" /> Add Schedule
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-3">{isEditing ? 'Edit Schedule' : 'Add New Schedule'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="bus" value={formData.bus} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Bus</option>
              {buses.map((bus) => (
                <option key={bus.id} value={bus.id}>{bus.bus_number}</option>
              ))}
            </select>
            <select name="route" value={formData.route} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>{route.name}</option>
              ))}
            </select>
            <input type="time" name="departure_time" value={formData.departure_time} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="weekdays" placeholder="e.g. Mon,Tue" value={formData.weekdays} onChange={handleChange} className="border p-2 rounded" required />
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 mr-2" disabled={actionLoading}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={actionLoading}>
              {actionLoading ? <Spinner small /> : (isEditing ? 'Update Schedule' : 'Add Schedule')}
            </button>
          </div>
        </form>
      </Modal>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow bg-white">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase">Bus</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase">Departure Time</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase">Weekdays</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-white uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredSchedules.map((s) => {
                const bus = buses.find((b) => b.id === s.bus)?.bus_number || '';
                const route = routes.find((r) => r.id === s.route)?.name || '';
                return (
                  <tr key={s.id} className="hover:bg-blue-50">
                    <td className="px-6 py-4 text-gray-700">{bus}</td>
                    <td className="px-6 py-4 text-gray-600">{route}</td>
                    <td className="px-6 py-4 text-gray-600">{s.departure_time}</td>
                    <td className="px-6 py-4 text-gray-600">{s.weekdays}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => openEditModal(s)} className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800 mr-2" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800" title="Delete" disabled={actionLoading}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SchedulesManagement;