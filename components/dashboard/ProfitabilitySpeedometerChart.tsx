"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const won = 51;
const lost = 20;
const totalTrades = won + lost;
const winRate = (won / totalTrades) * 100;

const data = [
  { name: "Won", value: won },
  { name: "Lost", value: lost },
];

export default function ProfitabilitySpeedometerChart() {
  return (
    <div className="col-span-7 rounded-xl p-5 overflow-hidden card-premium h-52">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-lg text-white/50">Profitability</span>

        <span className="text-lg text-white/50">
          Avg Holding Period:{" "}
          <span style={{ color: "var(--foreground)" }}>16m</span>
        </span>
      </div>

      {/* Content */}
      <div className="flex justify-between items-center -mt-6">
        {/* Won */}
        <div className="space-y-2">
          <p className="text-xs text-white/50">Won</p>
          <p className="text-3xl font-bold text-white">{winRate.toFixed(1)}%</p>
          <p className="text-xs text-white/50">{won}</p>
        </div>

        {/* Gauge */}
        <div className="w-[220px] h-[210px] relative ">
          <ResponsiveContainer width="100%" height="100%" className={"mt-4"}>
            <PieChart>
              <Pie
                data={data}
                startAngle={180}
                endAngle={0}
                innerRadius={90}
                outerRadius={105}
                paddingAngle={2}
                dataKey="value"
              >
                <Cell fill="#22c55e" strokeWidth={0} />
                <Cell fill="#ef4444" strokeWidth={0} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center top-6 -mt-10">
            <p className="text-xs text-white/50">Trades Taken</p>
            <p className="text-2xl font-bold text-white">{totalTrades}</p>
            <p className="text-xs text-white/50">
              Winrate: {winRate.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Lost */}
        <div className="text-right space-y-2">
          <p className="text-xs text-white/50">Lost</p>
          <p className="text-3xl font-bold text-white">
            {(100 - winRate).toFixed(1)}%
          </p>
          <p className="text-xs text-white/50">{lost}</p>
        </div>
      </div>
    </div>
  );
}
