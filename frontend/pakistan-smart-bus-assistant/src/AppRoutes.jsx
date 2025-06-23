import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthContext } from './contexts/AuthContext';

import AdminRoutesManagement from './components/AdminPanel/RoutesManagement';
import AdminBusesManagement from './components/AdminPanel/BusesManagement';
import AdminSchedulesManagement from './components/AdminPanel/SchedulesManagement';
import AdminNotificationsManagement from './components/AdminPanel/NotificationsManagement';
import AdminFaresManagement from './components/AdminPanel/FaresManagement';
import AdminComplaintsManagement from './components/AdminPanel/ComplaintsManagement';
import AdminCapacityStatus from './components/AdminPanel/CapacityStatus';
import AdminHome from './components/AdminPanel/Dashboard';


import SearchRoutes from './components/UserPanel/SearchRoutes';
import UserSchedules from './components/UserPanel/UserSchedules';
import CapacityStatus from './components/UserPanel/CapacityStatus';
import FareInfo from './components/UserPanel/FareInfo';
import UserNotifications from './components/UserPanel/UserNotifications';
import UserComplaints from './components/UserPanel/UserComplaints';
import Profile from './components/UserPanel/Profile';


// Admin Route Guard
const AdminPrivateRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);
  if (!authData || !authData.user?.is_admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// User Route Guard
const UserPrivateRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);
  if (!authData || authData.user?.is_admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Protected Routes (Nested) */}
      <Route
        path="/admin"
        element={
          <AdminPrivateRoute>
            <AdminDashboard />
          </AdminPrivateRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="routes" element={<AdminRoutesManagement />} />
        <Route path="buses" element={<AdminBusesManagement />} />
        <Route path="schedules" element={<AdminSchedulesManagement />} />
        <Route path="notifications" element={<AdminNotificationsManagement />} />
        <Route path="fares" element={<AdminFaresManagement />} />
        <Route path="complaints" element={<AdminComplaintsManagement />} />
        <Route path="capacity" element={<AdminCapacityStatus />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* User Dashboard */}
      <Route
        path="/profile"
        element={
          <UserPrivateRoute>
            <Profile />
          </UserPrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <UserPrivateRoute>
            <Dashboard />
          </UserPrivateRoute>
        }
      />

      {/* User Functional Routes (Flat) */}
      <Route
        path="/search-routes"
        element={
          <UserPrivateRoute>
            <SearchRoutes />
          </UserPrivateRoute>
        }
      />
      <Route
        path="/schedules"
        element={
          <UserPrivateRoute>
            <UserSchedules />
          </UserPrivateRoute>
        }
      />
      <Route
        path="/capacity"
        element={
          <UserPrivateRoute>
            <CapacityStatus />
          </UserPrivateRoute>
        }
      />
      <Route
        path="/fares"
        element={
          <UserPrivateRoute>
            <FareInfo />
          </UserPrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <UserPrivateRoute>
            <UserNotifications />
          </UserPrivateRoute>
        }
      />
      <Route
        path="/complaints"
        element={
          <UserPrivateRoute>
            <UserComplaints />
          </UserPrivateRoute>
        }
      />

      {/*  Unknown paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
