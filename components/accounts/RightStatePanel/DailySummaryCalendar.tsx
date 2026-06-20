"use client";

import { useMemo, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

type Props = {
  data: DailyTrade[];
};

export type DailyTrade = {
  balance: string;
  date: string; // YYYY-MM-DD
  lot_size: string;
  profit: string; // can be + or -
  trades: number;
  trading_day: boolean;
};

type MonthlySummary = {
  totalProfit: number;
  tradingDays: number;
};

export function getMonthlySummary(
  data: DailyTrade[],
  year: number,
  month: number // 0-based (Jan = 0)
): MonthlySummary {
  let totalProfit = 0;
  let tradingDays = 0;

  data.forEach((day) => {
    const d = new Date(day.date);

    if (d.getFullYear() === year && d.getMonth() === month && day.trading_day) {
      totalProfit += Number(day.profit);
      tradingDays += 1;
    }
  });

  return {
    totalProfit: Number(totalProfit.toFixed(2)),
    tradingDays,
  };
}

// Helper function

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: (Date | null)[] = [];

  // Padding BEFORE month start
  const startPadding = firstDay.getDay(); // Sun = 0
  for (let i = 0; i < startPadding; i++) {
    days.push(null);
  }

  // Actual days of month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  // Padding AFTER month end (to reach 42 cells)
  const totalCells = 42;
  const endPadding = totalCells - days.length;

  for (let i = 0; i < endPadding; i++) {
    days.push(null);
  }

  return days; // always length = 42
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function DailySummaryCalendar({ data }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Map for O(1) lookup
  const dataMap = useMemo(() => {
    const map = new Map<string, DailyTrade>();
    data.forEach((d) => map.set(d.date, d));
    return map;
  }, [data]);

  const days = useMemo(() => getMonthDays(year, month), [year, month]);

  const monthlySummary = useMemo(() => {
    return getMonthlySummary(data, year, month);
  }, [data, year, month]);

  /* =======================
     Weekly Summary
  ======================= */

  const weeklySummary = useMemo(() => {
    const weeks: {
      pnl: number;
      days: number;
      label: string;
    }[] = [];

    let weekStart = new Date(year, month, 1);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    for (let i = 0; i < 5; i++) {
      const start = new Date(weekStart);
      start.setDate(start.getDate() + i * 7);

      const end = new Date(start);
      end.setDate(end.getDate() + 6);

      const tradesInWeek = data.filter((d) => {
        const dt = new Date(d.date);
        return dt >= start && dt <= end;
      });

      weeks.push({
        pnl: tradesInWeek.reduce((a, b) => a + Number(b.profit), 0),
        days: tradesInWeek.length,
        label: `${start.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })} - ${end.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`,
      });
    }

    return weeks;
  }, [data, year, month]);

  return (
    <div>
      {/* ================= Header ================= */}
      <h1 className="text-sm mb-6">Daily Summary</h1>
      <div className="flex justify-between">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="px-3 py-3 rounded-lg border border-white/10"
          >
            <FiChevronLeft />
          </button>

          <h2 className="font-medium text-white w-30 text-center">
            {currentDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="px-3 py-3 rounded-lg border border-white/10"
          >
            <FiChevronLeft className="rotate-180" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="px-3 py-1 rounded-lg bg-white/5">
            PnL:{" "}
            <span
              className={
                monthlySummary.totalProfit >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }
            >
              ${monthlySummary.totalProfit.toFixed(2)}
            </span>
          </div>

          <div className="px-3 py-1 rounded-lg bg-white/5 text-white/60">
            Days: {monthlySummary.tradingDays}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-8 py-2">
        {/* ================= Calendar ================= */}
        <div>
          {/* Weekdays */}
          <div className="grid grid-cols-7 text-xs text-white/40 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {days.map((date, idx) => {
              if (!date)
                return (
                  <div key={idx} className="h-[88px] rounded-xl bg-white/2" />
                );

              const dayData = dataMap.get(formatDate(date));
              const profit = dayData ? Number(dayData.profit) : 0;

              return (
                <div
                  key={idx}
                  className={`h-[88px] rounded-xl p-2 border transition
          ${
            dayData
              ? profit >= 0
                ? "bg-emerald-500/15 border-emerald-400/30"
                : "bg-red-500/15 border-red-400/30"
              : "bg-white/3 border-white/3 hover:bg-white/2 hover:border-white/2"
          }`}
                >
                  <div className="text-sm font-medium text-white">
                    {date.getDate()}
                  </div>

                  {dayData && (
                    <div className="mt-2 text-xs">
                      <div className="text-white/70">{dayData.trades} ↔</div>
                      <div
                        className={
                          profit >= 0 ? "text-emerald-400" : "text-red-400"
                        }
                      >
                        ${profit.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= Weekly Summary ================= */}
        <div>
          <h3 className="text-xs font-medium text-white/50 mb-4">
            Weekly Summary
          </h3>

          <div className="space-y-4">
            {weeklySummary.map((w, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-white">
                  <span>Week {i + 1}</span>
                  <span className="text-white/40">{w.label}</span>
                </div>

                {w.days === 0 ? (
                  <p className="text-xs text-white/40 mt-1">No trades</p>
                ) : (
                  <div className="flex justify-between mt-1 text-xs">
                    <span
                      className={
                        w.pnl >= 0 ? "text-emerald-400" : "text-red-400"
                      }
                    >
                      PnL: ${w.pnl.toFixed(2)}
                    </span>
                    <span className="text-white/40">Days: {w.days}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
