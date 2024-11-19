import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!month) return; // Don't fetch if month is not selected.

    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `https://roxiler-mern-backend-task.onrender.com/api/statistics?month=${month}`
        );
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching statistics:", err);
      }
    };

    fetchStats();
  }, [month]);

  // If no month is selected, prompt the user to select one.
  if (!month) {
    return (
      <div className="p-6 border rounded-lg bg-white shadow text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Statistics</h2>
        <p className="text-gray-600">
          Please select a month to view the statistics!
        </p>
      </div>
    );
  }

  // Show a loading message while fetching data.
  if (!stats) {
    return (
      <div className="p-6 border rounded-lg bg-white shadow text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Statistics</h2>
        <p className="text-blue-500">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="font-medium text-lg">Total Sales</p>
          <p className="text-xl font-bold text-blue-600">
            ${stats.totalSaleAmount}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="font-medium text-lg">Sold Items</p>
          <p className="text-xl font-bold text-green-600">
            {stats.totalSoldItems}
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="font-medium text-lg">Unsold Items</p>
          <p className="text-xl font-bold text-red-600">
            {stats.totalNotSoldItems}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
