import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Topbar = () => {
  const { authData, logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-lg font-semibold">Pakistan Smart Bus Assistant </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
