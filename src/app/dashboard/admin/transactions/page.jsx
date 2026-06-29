"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiDollarSign, FiClock, FiCheckCircle, FiXCircle, FiTrendingUp } from "react-icons/fi";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "All") params.append("status", statusFilter);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/transactions?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data.transactions || []);
      setTotalRevenue(data.totalRevenue || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly
    const delayDebounceFn = setTimeout(() => {
      fetchTransactions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [statusFilter, searchQuery]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return <FiCheckCircle className="text-green-500" />;
      case "failed":
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-yellow-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions Monitoring</h1>
          <p className="text-zinc-400">View and manage all payment activities</p>
        </div>
        
        {/* Revenue Card */}
        <div className="flex items-center gap-4 rounded-xl border border-[#0A7C6E]/30 bg-[#0A7C6E]/10 p-4 shadow-[0_0_15px_rgba(10,124,110,0.1)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A7C6E]/20 text-[#0A7C6E]">
            <FiTrendingUp size={24} />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-400">Total Revenue</div>
            <div className="text-2xl font-bold text-[#0A7C6E]">৳ {totalRevenue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#18181b] p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by Transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none focus:border-[#0A7C6E] focus:ring-1 focus:ring-[#0A7C6E]"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <FiFilter className="text-zinc-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-3 pr-8 text-sm text-white outline-none focus:border-[#0A7C6E]"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      {loading && transactions.length === 0 ? (
        <div className="text-zinc-400">Loading transactions...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : transactions.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-[#18181b] p-8 text-center text-zinc-400">
          No transactions found matching your criteria.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#18181b]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-[#27272a]/50 text-xs uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Buyer ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {transactions.map((t) => (
                <tr key={t._id} className="hover:bg-[#27272a]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-white">{t.transactionId}</td>
                  <td className="px-6 py-4 text-xs">{t.buyerId}</td>
                  <td className="px-6 py-4">
                    {new Date(t.paymentDate).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    ৳ {t.paymentAmount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(t.paymentStatus)}
                      <span className="capitalize">{t.paymentStatus}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
