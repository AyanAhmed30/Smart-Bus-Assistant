import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [fareDistribution, setFareDistribution] = useState([]);
  const [busCapacities, setBusCapacities] = useState([]);
  const [busUsage, setBusUsage] = useState([]);

  const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6'];

  useEffect(() => {
    fetchStats();
    fetchFareDistribution();
    fetchBusCapacities();
    fetchBusUsage();
  }, []);

  const fetchStats = async () => {
    try {
      const [buses, routes, schedules, fares, complaints] = await Promise.all([
        api.get('buses/'),
        api.get('routes/'),
        api.get('schedules/'),
        api.get('fares/'),
        api.get('complaints/'),
      ]);

      setChartData([
        { name: 'Buses', count: buses.data.length },
        { name: 'Routes', count: routes.data.length },
        { name: 'Schedules', count: schedules.data.length },
        { name: 'Fares', count: fares.data.length },
        { name: 'Complaints', count: complaints.data.length },
      ]);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const fetchFareDistribution = async () => {
    try {
      const res = await api.get('fares/');
      const routeCounts = res.data.reduce((acc, fare) => {
        const route = fare.route_name || `Route ${fare.route}`;
        acc[route] = (acc[route] || 0) + 1;
        return acc;
      }, {});
      const formatted = Object.entries(routeCounts).map(([name, count]) => ({ name, value: count }));
      setFareDistribution(formatted);
    } catch (err) {
      console.error('Failed to fetch fare distribution');
    }
  };

  const fetchBusCapacities = async () => {
    try {
      const res = await api.get('buses/');
      const formatted = res.data.map(bus => ({
        name: bus.bus_number,
        capacity: bus.capacity,
      }));
      setBusCapacities(formatted);
    } catch (err) {
      console.error('Failed to fetch bus capacities');
    }
  };

  const fetchBusUsage = async () => {
    try {
      const res = await api.get('buses/');
      const data = res.data.map((bus, index) => ({
        name: bus.bus_number,
        capacity: bus.capacity,
        occupancy: Math.floor(Math.random() * bus.capacity), // Dummy dynamic
      }));
      setBusUsage(data);
    } catch (err) {
      console.error('Failed to fetch bus usage');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
    

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Entity Count Bar Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Entity Count Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fare Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Fare Distribution by Route</h2>
          {fareDistribution.length === 0 ? (
            <p className="text-gray-500">No fare data found.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fareDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {fareDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bus Capacities */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Bus Capacities</h2>
          {busCapacities.length === 0 ? (
            <p className="text-gray-500">No bus data found.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={busCapacities}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="capacity" fill="#f97316" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Daily Bus Usage Line Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Daily Bus Usage (Estimated)</h2>
          {busUsage.length === 0 ? (
            <p className="text-gray-500">No usage data found.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={busUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="capacity" stroke="#6366F1" strokeWidth={2} />
                <Line type="monotone" dataKey="occupancy" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
