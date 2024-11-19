import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);

  const fetchChartData = async () => {
    if (!month) return;

    setLoadingChart(true);
    try {
      const response = await axios.get(
        `https://roxiler-mern-backend-task.onrender.com/api/statistics/bar-chart?month=${month}`
      );

      const ranges = [
        "0 - 100",
        "101 - 200",
        "201 - 300",
        "301 - 400",
        "401 - 500",
        "501 - 600",
        "601 - 700",
        "701 - 800",
        "801 - 900",
        "901-above",
      ];

      const dataWithZeroes = ranges.map((range) => {
        const found = response.data.find((item) => item.priceRange === range);
        return found || { priceRange: range, count: 0 };
      });

      setChartData(dataWithZeroes);
    } catch (err) {
      console.error("Error fetching chart data:", err);
      setChartData([]);
    } finally {
      setLoadingChart(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [month]);

  const data = {
    labels: chartData.map((item) => item.priceRange),
    datasets: [
      {
        label: "Number of Items",
        data: chartData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      chartAreaBackground: {
        color: "rgba(173, 216, 230, 0.3)", // Light blue background
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Price Range",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Items",
        },
        beginAtZero: true,
      },
    },
  };

  // Custom plugin to add background color
  const chartAreaBackground = {
    id: "chartAreaBackground",
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      ctx.save();
      ctx.fillStyle = options.plugins.chartAreaBackground.color;
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top
      );
      ctx.restore();
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Bar Chart</h2>

      {!month ? (
        <p>Please select a month to view the chart and transactions.</p>
      ) : loadingChart ? (
        <p>Loading chart...</p>
      ) : chartData.length > 0 ? (
        <div className="mb-8">
          <Bar data={data} options={options} plugins={[chartAreaBackground]} />
        </div>
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default BarChart;
