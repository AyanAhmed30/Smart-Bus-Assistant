import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', to: '/admin' },
    { name: 'Routes', to: '/admin/routes' },
    { name: 'Buses', to: '/admin/buses' },
    { name: 'Schedules', to: '/admin/schedules' },
    { name: 'Notifications', to: '/admin/notifications' },
    { name: 'Fares', to: '/admin/fares' },
    { name: 'Complaints', to: '/admin/complaints' },
    { name: 'Capacity Status', to: '/admin/capacity' },


    // Add other links here
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">Admin Panel</div>
      <nav className="flex flex-col flex-grow p-4 space-y-2">
        {navItems.map(({ name, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'} // exact match for dashboard link
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 font-semibold' : ''
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
