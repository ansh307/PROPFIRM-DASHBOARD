"use client";

import { useEffect, useMemo, useState } from "react";
import { CiShare2 } from "react-icons/ci";

/* =======================
   Types
======================= */

export type Trade = {
  symbol: string;
  type: "Buy" | "Sell";
  openDate: string;
  openPrice: number;
  closeDate?: string;
  closePrice?: number;
  tp?: string;
  sl?: string;
  lots: number;
  commission: number;
  profit: number;
};

/* =======================
   Dummy Data
======================= */

const tradingHistory: Trade[] = [
  {
    symbol: "XAUUSD",
    type: "Buy",
    openDate: "1/6/2026, 04:32",
    openPrice: 4452.55,
    closeDate: "1/6/2026, 04:32",
    closePrice: 4452.07,
    lots: 0.01,
    commission: -0.05,
    profit: -0.53,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/5/2026, 22:57",
    openPrice: 4446.63,
    closeDate: "1/5/2026, 23:00",
    closePrice: 4445.32,
    lots: 0.1,
    commission: -0.5,
    profit: 12.6,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/2/2026, 19:55",
    openPrice: 4369.41,
    closeDate: "1/2/2026, 20:05",
    closePrice: 4354.82,
    lots: 0.1,
    commission: -0.5,
    profit: 145.4,
  },
  {
    symbol: "XAUUSD",
    type: "Buy",
    openDate: "1/6/2026, 04:32",
    openPrice: 4452.55,
    closeDate: "1/6/2026, 04:32",
    closePrice: 4452.07,
    lots: 0.01,
    commission: -0.05,
    profit: -0.53,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/5/2026, 22:57",
    openPrice: 4446.63,
    closeDate: "1/5/2026, 23:00",
    closePrice: 4445.32,
    lots: 0.1,
    commission: -0.5,
    profit: 12.6,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/2/2026, 19:55",
    openPrice: 4369.41,
    closeDate: "1/2/2026, 20:05",
    closePrice: 4354.82,
    lots: 0.1,
    commission: -0.5,
    profit: 145.4,
  },
  {
    symbol: "XAUUSD",
    type: "Buy",
    openDate: "1/6/2026, 04:32",
    openPrice: 4452.55,
    closeDate: "1/6/2026, 04:32",
    closePrice: 4452.07,
    lots: 0.01,
    commission: -0.05,
    profit: -0.53,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/5/2026, 22:57",
    openPrice: 4446.63,
    closeDate: "1/5/2026, 23:00",
    closePrice: 4445.32,
    lots: 0.1,
    commission: -0.5,
    profit: 12.6,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/2/2026, 19:55",
    openPrice: 4369.41,
    closeDate: "1/2/2026, 20:05",
    closePrice: 4354.82,
    lots: 0.1,
    commission: -0.5,
    profit: 145.4,
  },
  {
    symbol: "XAUUSD",
    type: "Buy",
    openDate: "1/6/2026, 04:32",
    openPrice: 4452.55,
    closeDate: "1/6/2026, 04:32",
    closePrice: 4452.07,
    lots: 0.01,
    commission: -0.05,
    profit: -0.53,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/5/2026, 22:57",
    openPrice: 4446.63,
    closeDate: "1/5/2026, 23:00",
    closePrice: 4445.32,
    lots: 0.1,
    commission: -0.5,
    profit: 12.6,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/2/2026, 19:55",
    openPrice: 4369.41,
    closeDate: "1/2/2026, 20:05",
    closePrice: 4354.82,
    lots: 0.1,
    commission: -0.5,
    profit: 145.4,
  },
  {
    symbol: "XAUUSD",
    type: "Buy",
    openDate: "1/6/2026, 04:32",
    openPrice: 4452.55,
    closeDate: "1/6/2026, 04:32",
    closePrice: 4452.07,
    lots: 0.01,
    commission: -0.05,
    profit: -0.53,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/5/2026, 22:57",
    openPrice: 4446.63,
    closeDate: "1/5/2026, 23:00",
    closePrice: 4445.32,
    lots: 0.1,
    commission: -0.5,
    profit: 12.6,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/2/2026, 19:55",
    openPrice: 4369.41,
    closeDate: "1/2/2026, 20:05",
    closePrice: 4354.82,
    lots: 0.1,
    commission: -0.5,
    profit: 145.4,
  },
  {
    symbol: "XAUUSD",
    type: "Buy",
    openDate: "1/6/2026, 04:32",
    openPrice: 4452.55,
    closeDate: "1/6/2026, 04:32",
    closePrice: 4452.07,
    lots: 0.01,
    commission: -0.05,
    profit: -0.53,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/5/2026, 22:57",
    openPrice: 4446.63,
    closeDate: "1/5/2026, 23:00",
    closePrice: 4445.32,
    lots: 0.1,
    commission: -0.5,
    profit: 12.6,
  },
  {
    symbol: "XAUUSD",
    type: "Sell",
    openDate: "1/2/2026, 19:55",
    openPrice: 4369.41,
    closeDate: "1/2/2026, 20:05",
    closePrice: 4354.82,
    lots: 0.1,
    commission: -0.5,
    profit: 145.4,
  },
];

const openPositions: Trade[] = [];

/* =======================
   Config
======================= */

const PAGE_SIZE = 15;

/* =======================
   Component
======================= */

export default function TradingTable() {
  const [activeTab, setActiveTab] = useState<"history" | "positions">(
    "history"
  );

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  // Trigger loading when tab or page changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500); // fake delay
    return () => clearTimeout(t);
  }, [activeTab, page]);

  const data = activeTab === "history" ? tradingHistory : openPositions;

  // Reset page when tab changes
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  /* =======================
     Pagination Logic
  ======================= */

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <TabButton
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        >
          Trading History
        </TabButton>

        <TabButton
          active={activeTab === "positions"}
          onClick={() => setActiveTab("positions")}
        >
          Open Positions
        </TabButton>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <TableSkeleton />
        ) : data.length === 0 ? (
          <EmptyData />
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="py-3 text-left w-8"></th>
                  <th className="py-3 text-left">Symbol</th>
                  <th className="py-3 text-left">Type</th>
                  <th className="py-3 text-left">Open Date</th>
                  <th className="py-3 text-left">Open</th>
                  <th className="py-3 text-left">Closed Date</th>
                  <th className="py-3 text-left">Closed</th>
                  <th className="py-3 text-left">TP</th>
                  <th className="py-3 text-left">SL</th>
                  <th className="py-3 text-left">Lots</th>
                  <th className="py-3 text-left">Commission</th>
                  <th className="py-3 text-left">Profit</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((trade, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-3">
                      <CiShare2 className="w-4 h-4 text-gray-400" />
                    </td>

                    <td className="py-3 text-white">{trade.symbol}</td>

                    <td
                      className={`py-3 font-medium ${
                        trade.type === "Buy"
                          ? "text-emerald-400"
                          : "text-red-500"
                      }`}
                    >
                      {trade.type}
                    </td>

                    <td className="py-3 text-white">{trade.openDate}</td>

                    <td className="py-3 text-white">
                      {trade.openPrice.toFixed(2)}
                    </td>

                    <td className="py-3 text-white">
                      {trade.closeDate ?? "-"}
                    </td>

                    <td className="py-3 text-white">
                      {trade.closePrice ? trade.closePrice.toFixed(2) : "-"}
                    </td>

                    <td className="py-3 text-white">-</td>
                    <td className="py-3 text-white">-</td>

                    <td className="py-3 text-white">{trade.lots}</td>

                    <td className="py-3 text-white">
                      ${trade.commission.toFixed(2)}
                    </td>

                    <td
                      className={`py-3 text-left font-medium ${
                        trade.profit >= 0 ? "text-emerald-400" : "text-red-500"
                      }`}
                    >
                      {trade.profit >= 0 ? "+" : "-"}$
                      {Math.abs(trade.profit).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-center mt-4 gap-4 text-sm text-white/60">
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded-lg border border-white/10 disabled:opacity-40 hover:bg-white/5"
            >
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded-lg border border-white/10 disabled:opacity-40 hover:bg-white/5"
            >
              Next
            </button>
          </div>
          <span className="text-white/30">
            Page {page} of {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}

/* =======================
   Tab Button
======================= */

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
        active ? "card-premium text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyData() {
  return (
    <div className="flex flex-col items-center justify-center h-[260px] text-center text-white/50 gap-3">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white/40"
      >
        <path
          d="M3 17l6-6 4 4 7-7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 7h7v7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="text-white text-sm font-medium">No trades yet</p>
      <p className="text-xs text-white/40">
        Start trading to see your history here
      </p>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3 py-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-8 w-full rounded-md bg-white/5 animate-pulse"
        />
      ))}
    </div>
  );
}
