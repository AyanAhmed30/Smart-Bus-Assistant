import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FaEdit, FaSearch } from 'react-icons/fa';
import Spinner from '../Spinner';
import Modal from '../Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CapacityStatus = () => {
  const { authData } = useContext(AuthContext);
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, current_occupancy: '' });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const res = await api.get('buses/');
      setBuses(res.data);
    } catch (err) {
      toast.error('Failed to fetch buses');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (bus) => {
    setFormData({ id: bus.id, current_occupancy: bus.current_occupancy });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, current_occupancy: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authData?.user?.is_admin) {
      toast.error('Only admins can update capacity');
      return;
    }

    setActionLoading(true);
    try {
      await api.patch(`buses/${formData.id}/`, {
        current_occupancy: formData.current_occupancy,
      });
      toast.success('Capacity updated');
      fetchBuses();
      setModalOpen(false);
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredBuses = buses.filter((bus) =>
    bus.bus_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">Capacity Status Management</h2>

      {(loading || actionLoading) ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search by bus number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded shadow-sm"
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold mb-4">Update Occupancy</h3>
              <select
                name="current_occupancy"
                value={formData.current_occupancy}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select Status</option>
                <option value="Empty">Empty</option>
                <option value="Medium">Medium</option>
                <option value="Full">Full</option>
              </select>

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
                  {actionLoading ? <Spinner /> : 'Update'}
                </button>
              </div>
            </form>
          </Modal>

          <div className="overflow-x-auto">
            {filteredBuses.length === 0 ? (
              <p>No buses found.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow bg-white">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-left">
                  <tr>
                    <th className="px-6 py-3">Bus Number</th>
                    <th className="px-6 py-3">Plate Number</th>
                    <th className="px-6 py-3">Current Occupancy</th>
                    <th className="px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBuses.map((bus, idx) => (
                    <tr key={bus.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-3">{bus.bus_number}</td>
                      <td className="px-6 py-3">{bus.plate_number}</td>
                      <td className="px-6 py-3">{bus.current_occupancy}</td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => openEditModal(bus)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CapacityStatus;
