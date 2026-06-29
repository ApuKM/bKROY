"use client";

import { useEffect, useState } from "react";
import { FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function BuyerPaymentHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data.transactions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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
      <h1 className="mb-6 text-2xl font-bold text-white">Payment History</h1>

      {loading ? (
        <div className="text-zinc-400">Loading your transactions...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : transactions.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-[#18181b] p-8 text-center text-zinc-400">
          No payment history found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#18181b]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-[#27272a]/50 text-xs uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {transactions.map((t) => (
                <tr key={t._id} className="hover:bg-[#27272a]/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{t.transactionId}</td>
                  <td className="px-6 py-4">
                    {new Date(t.paymentDate).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 font-bold text-[#0A7C6E]">
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
