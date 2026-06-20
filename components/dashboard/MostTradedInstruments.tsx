"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

type InstrumentStats = {
  symbol: string;
  wins: number;
  losses: number;
};

const data: InstrumentStats[] = [
  { symbol: "XAUUSD", wins: 43, losses: 20 },
  { symbol: "DJI30", wins: 8, losses: 0 },
];

export default function MostTradedInstruments() {
  const lastIndexoOfData = data.length;

  return (
    <div className="col-span-5 rounded-xl p-5 transition-colors h-[23vh] card-premium">
      <p className="text-sm mb-6 text-white/50">Most Traded 3 Instruments</p>

      <div className="h-full space-y-6">
        {data.map((item, index) => {
          const total = item.wins + item.losses;

          return (
            <div key={item.symbol}>
              <div className="flex items-center gap-4">
                {/* Symbol */}
                <span className="w-16 text-sm font-semibold text-white">
                  {item.symbol}
                </span>

                {/* Bar */}
                <div className="flex-1 h-7">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[item]}
                      layout="vertical"
                      stackOffset="expand"
                    >
                      <XAxis hide type="number" />
                      <YAxis hide type="category" />

                      <Bar
                        dataKey="wins"
                        stackId="a"
                        fill="#22c55e"
                        radius={[
                          999,
                          item.losses === 0 ? 999 : 0,
                          item.losses === 0 ? 999 : 0,
                          999,
                        ]}
                      />
                      <Bar
                        dataKey="losses"
                        stackId="a"
                        fill="#ef4444"
                        radius={[
                          item.wins === 0 ? 999 : 0,
                          999,
                          999,
                          item.wins === 0 ? 999 : 0,
                        ]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* W/L */}
                <span className="w-20 text-sm text-white text-right">
                  {item.wins}W / {item.losses}L
                </span>
              </div>

              {index !== lastIndexoOfData - 1 && (
                <div className="w-full border-b border-white/5 my-4" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
