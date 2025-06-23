// src/pages/AdminDashboard.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/AdminPanel/Sidebar';
import Topbar from '../components/AdminPanel/Topbar';
import { AuthContext } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { authData } = useContext(AuthContext);

  if (!authData || !authData.user?.is_admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Topbar />
        <main className="flex-grow overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
