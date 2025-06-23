import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Spinner from '../Spinner';
import Modal from '../Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmToast from '../ConfirmToast';

const NotificationsManagement = () => {
  const { authData } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get('notifications/');
      setNotifications(res.data);
    } catch (err) {
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    setActionLoading(true);
    try {
      await api.post('notifications/', { message });
      toast.success('Notification sent');
      setModalOpen(false);
      setMessage('');
      fetchNotifications();
    } catch (err) {
      toast.error('Error sending notification');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = (id) => {
    ConfirmToast({
      message: 'Are you sure you want to delete this notification?',
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await api.delete(`notifications/${id}/`);
          toast.success('Notification deleted');
          fetchNotifications();
        } catch (err) {
          toast.error('Error deleting notification');
        } finally {
          setActionLoading(false);
        }
      },
      onCancel: () => toast.info('Deletion cancelled'),
    });
  };

  const filteredNotifications = notifications.filter((n) =>
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">Notifications Management</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded shadow-sm"
        />
        <button
          onClick={() => setModalOpen(true)}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Send Notification
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-3">New Notification</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full border p-2 rounded"
            placeholder="Enter notification message..."
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 mr-2"
              onClick={() => setModalOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={actionLoading}
            >
              {actionLoading ? <Spinner /> : 'Send'}
            </button>
          </div>
        </form>
      </Modal>

      {loading ? (
        <Spinner />
      ) : filteredNotifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="bg-white divide-y divide-gray-200 rounded shadow">
          {filteredNotifications.map((n) => (
            <li key={n.id} className="px-4 py-3 flex justify-between items-center">
              <div>
                <p className="text-gray-800">{n.message}</p>
                <p className="text-sm text-gray-500">{new Date(n.created_at).toLocaleString()}</p>
              </div>
              {authData?.user?.is_admin && (
                <button
                  onClick={() => handleDelete(n.id)}
                  className="text-red-600 hover:text-red-800"
                  disabled={actionLoading}
                >
                  <FaTrash />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsManagement;
