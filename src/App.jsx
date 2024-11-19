import { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import "./App.css";

function App() {
  const [month, setMonth] = useState(""); // Start with an empty value

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Dashboard
      </h1>
      <div className="mb-6 flex flex-col items-center">
        <label
          htmlFor="month"
          className="block font-medium text-lg text-gray-700 mb-2"
        >
          Select Month:
        </label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-3 rounded-lg w-full max-w-xs text-gray-700 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Month</option> {/* Default option */}
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <Statistics month={month} />
      </div>

      <div className="mb-6">
        <TransactionsTable month={month} />
      </div>

      <div>
        {!month ? (
          <div className="p-6 border rounded-lg bg-white shadow text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Charts</h2>
            <p className="text-gray-600">
              Please select a month to view the charts.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Render BarChart */}
            <div
              className="flex-1 border rounded-lg bg-white shadow p-4"
              style={{ minHeight: "400px" }}
            >
              <BarChart month={month} />
            </div>

            {/* Render PieChart */}
            <div
              className="flex-1 border rounded-lg bg-white shadow p-4"
              style={{ minHeight: "400px" }}
            >
              <PieChart month={month} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
