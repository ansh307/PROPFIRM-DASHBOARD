"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

type DayPerformance = {
  day: string;
  profit: number;
  loss: number;
};

const data: DayPerformance[] = [
  { day: "Sun", profit: 10, loss: 50 },
  { day: "Mon", profit: 37.3, loss: 5 },
  { day: "Tue", profit: 50, loss: 20 },
  { day: "Wed", profit: 10, loss: 42 },
  { day: "Thu", profit: 20, loss: 2 },
  { day: "Fri", profit: 100, loss: 10 },
];

/* ======================
   Helpers
====================== */

const formatValue = (v: number) => {
  if (Math.abs(v) >= 1000) return `$${(v / 1000).toFixed(1)}k`;
  return `$${v}`;
};

const bestDay = data.reduce((a, b) =>
  b.profit - b.loss > a.profit - a.loss ? b : a
).day;

export default function TradingDayPerformance() {
  return (
    <div className="col-span-4 rounded-xl p-5 card-premium">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg text-white/50">Trading Day Performance</span>

        <span className="text-lg text-white/50">
          Best Day: <span className="font-semibold text-white">{bestDay}</span>
        </span>
      </div>

      {/* Chart */}
      <div className="h-[190px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={24}>
            <XAxis
              dataKey="day"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis hide />

            {/* Profit Bar */}
            <Bar
              dataKey="profit"
              maxBarSize={16}
              radius={[3, 3, 3, 3]}
              fill="#22c55e"
            />

            {/* Loss Bar */}
            <Bar
              dataKey="loss"
              maxBarSize={16}
              radius={[3, 3, 3, 3]}
              fill="#ef4444"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Values */}
      <div className="flex justify-between px-4 mt-2">
        {data.map((d) => {
          const net = d.profit - d.loss;
          return (
            <div
              key={d.day}
              className="text-sm"
              style={{
                color: net >= 0 ? "#10b981" : "#f87171",
              }}
            >
              {formatValue(net)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
