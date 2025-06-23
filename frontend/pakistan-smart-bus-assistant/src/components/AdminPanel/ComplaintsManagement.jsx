import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Spinner from '../Spinner';
import Modal from '../Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComplaintsManagement = () => {
  const { authData } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    user: '',
    bus: '',
    description: '',
    status: 'Pending'
  });

  useEffect(() => {
    fetchComplaints();
    fetchBuses();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await api.get('complaints/');
      setComplaints(res.data);
    } catch (err) {
      toast.error('Failed to fetch complaints.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBuses = async () => {
    try {
      const res = await api.get('buses/');
      setBuses(res.data);
    } catch (err) {
      toast.error('Failed to fetch buses.');
    }
  };

  const openEditModal = (complaint) => {
    setFormData({
      id: complaint.id,
      user: complaint.user,
      bus: complaint.bus,
      description: complaint.description,
      status: complaint.status
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
      toast.error('Only admins can update complaints.');
      return;
    }

    setActionLoading(true);
    try {
      const payload = {
        bus: formData.bus,
        description: formData.description,
        status: formData.status,
      };
      await api.put(`complaints/${formData.id}/`, payload);
      toast.success('Complaint updated');
      fetchComplaints();
      setModalOpen(false);
    } catch (err) {
      toast.error('Failed to update complaint');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredComplaints = complaints.filter((c) =>
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">Complaints Management</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded shadow-sm"
          />
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-4">Update Complaint Status</h3>
          <div className="grid grid-cols-1 gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
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
              Update
            </button>
          </div>
        </form>
      </Modal>

      {(loading || actionLoading) && <Spinner />}

      <div className="overflow-x-auto">
        {!loading && filteredComplaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow bg-white">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-left">
              <tr>
                <th className="px-6 py-3">User ID</th>
                <th className="px-6 py-3">Bus</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredComplaints.map((c, idx) => (
                <tr key={c.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-3">{c.user}</td>
                  <td className="px-6 py-3">{c.bus}</td>
                  <td className="px-6 py-3">{c.description}</td>
                  <td className="px-6 py-3 font-semibold">{c.status}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => openEditModal(c)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
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
    </div>
  );
};

export default ComplaintsManagement;
