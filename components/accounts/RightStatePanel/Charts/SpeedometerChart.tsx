"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = {
  profit: "#22c55e", // green
  loss: "#ef4444", // red
  track: "rgba(255,255,255,0.08)",
};

type Props = {
  title: string;
  profit: number;
  winRate?: number;
  wins: number;
  winAmount: number;
  losses: number;
  lossAmount: number;
  totalTrades?: number;
};

export default function SpeedometerChart({
  title,
  profit,
  winRate,
  wins,
  winAmount,
  totalTrades,
  losses,
  lossAmount,
}: Props) {
  // clamp winRate between 0–100

  let value: number;
  if (winRate === 0) {
    value = 0.1;
  } else if (winRate && winRate > 0.1 && winRate <= 100) {
    value = Math.max(0, Math.min(winRate, 100));
  } else if (totalTrades && totalTrades > 0) {
    value = Math.max(0, Math.min((wins / totalTrades) * 100, 100));
  } else {
    value = 0;
  }

  const data = [
    { name: "Win", value },
    { name: "Loss", value: 100 - value },
  ];

  return (
    <div className=" rounded-xl p-6 text-white relative card-premium">
      <h3 className="text-sm font-semibold mb-4 text-gray-200">{title}</h3>

      {/* Gauge */}
      <div className="relative w-full h-56 ">
        <ResponsiveContainer width="100%" height={224} aspect={undefined}>
          <PieChart>
            <Pie
              data={data}
              startAngle={180}
              endAngle={0}
              innerRadius="85%"
              outerRadius="100%"
              paddingAngle={2}
              dataKey="value"
            >
              <Cell fill={COLORS.profit} strokeWidth={0} />
              <Cell fill={COLORS.loss} strokeWidth={0} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center  -mt-8">
          <span className="text-xs text-gray-300">
            {winRate === 0 || winRate ? "Profit" : "Total Traders"}
          </span>
          <span className="text-2xl font-bold">
            {winRate === 0 || winRate
              ? `$${profit.toLocaleString()}`
              : `${totalTrades}`}
          </span>
        </div>
      </div>

      {/* Bottom Stats */}
      <div
        className={`grid text-center text-sm -mt-14  ${
          winRate === 0 || winRate ? "grid-cols-3" : "grid-cols-2 gap-8 w-full"
        }`}
      >
        <div>
          <p className="text-gray-400">Wins ({wins})</p>
          <p className="font-semibold">${winAmount.toLocaleString()}</p>
        </div>

        {winRate !== undefined && winRate !== null && (
          <div>
            <p className="text-gray-400">Win Rate</p>
            <p className="font-semibold">{winRate.toFixed(2)}%</p>
          </div>
        )}

        <div>
          <p className="text-gray-400">Losses ({losses})</p>
          <p className="font-semibold">${lossAmount.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
