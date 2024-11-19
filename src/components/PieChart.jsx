import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPieChartData = async () => {
    if (!month) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://roxiler-mern-backend-task.onrender.com/api/statistics/piechart?month=${month}`
      );
      setPieData(response.data);
    } catch (err) {
      console.error("Error fetching pie chart data:", err);
      setPieData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPieChartData();
  }, [month]);

  // Prepare data for the pie chart
  const chartData = {
    labels: pieData.map((item) => item.category),
    datasets: [
      {
        label: "Category Distribution",
        data: pieData.map((item) => item.itemCount),
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Purple
          "#FF9F40", // Orange
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5, // Adjust the chart aspect ratio
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      title: {
        display: true,
        text: "Category Distribution",
      },
    },
  };

  return (
    <div
      className="p-4 border rounded"
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">Pie Chart</h2>
      {loading ? (
        <p>Loading pie chart...</p>
      ) : pieData.length > 0 ? (
        <Pie data={chartData} options={chartOptions} />
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default PieChart;
