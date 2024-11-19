import { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://roxiler-mern-backend-task.onrender.com/api/products/transactions?month=${month}&page=${page}&search=${search}`
      );

      const transactions = response.data.data || [];
      const pagination = response.data.pagination || { totalPages: 1 };

      setTransactions(transactions);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, page, search]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-2 mb-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-50">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-3 text-left hidden lg:table-cell">
                  ID
                </th>
                <th className="border p-3 text-left">Title</th>
                <th className="border p-3 text-left hidden md:table-cell">
                  Description
                </th>
                <th className="border p-3 text-left hidden sm:table-cell">
                  Price
                </th>
                <th className="border p-3 text-left hidden lg:table-cell">
                  Category
                </th>
                <th className="border p-3 text-left hidden sm:table-cell">
                  Sold
                </th>
                <th className="border p-3 text-left hidden md:table-cell">
                  Image
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="border p-3 hidden lg:table-cell">{tx._id}</td>
                  <td className="border p-3">{tx.title}</td>
                  <td className="border p-3 hidden md:table-cell">
                    {tx.description}
                  </td>
                  <td className="border p-3 text-green-600 hidden sm:table-cell">
                    ${tx.price}
                  </td>
                  <td className="border p-3 hidden lg:table-cell">
                    {tx.category || "N/A"}
                  </td>
                  <td className="border p-3 hidden sm:table-cell">
                    {tx.sold ? (
                      <span className="text-green-500 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </td>
                  <td className="border p-3 hidden md:table-cell">
                    {tx.image ? (
                      <img
                        src={tx.image}
                        alt={tx.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No transactions found.</p>
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-lg ${
            page >= totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
