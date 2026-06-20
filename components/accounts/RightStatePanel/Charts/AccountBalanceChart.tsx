"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Props = {
  heading?: boolean;
  data: BalancePoint[];
  chartClassName?: string;
};

export type BalancePoint = {
  date: string; // ISO string
  balance: string;
  equity: string;
};

export default function AccountBalanceChart({
  data,
  chartClassName,
  heading = true,
}: Props) {
  // normalize data once
  const chartData = data.map((d) => ({
    time: new Date(d.date),
    balance: Number(d.balance),
    equity: Number(d.equity),
  }));

  return (
    <div className="mb-8">
      {/* Header */}
      {heading && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-white">Account Balance</h2>
        </div>
      )}

      {/* Chart */}
      <div
        className={`h-[450px] rounded-2xl border border-white/10  p-6 ${chartClassName}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />

            <XAxis
              dataKey="time"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              padding={{ left: 30, right: 16 }}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />

            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
            />

            {/* <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
              }}
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value: number, name) => [
                `$${value.toFixed(2)}`,
                name === "balance" ? "Balance" : "Equity",
              ]}
            /> */}

            {/* Balance */}
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }}
            />

            {/* Equity */}
            <Line
              type="monotone"
              dataKey="equity"
              stroke="#9ca3af"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
