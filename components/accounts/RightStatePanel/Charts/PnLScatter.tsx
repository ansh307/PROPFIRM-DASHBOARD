"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
} from "recharts";

type TradePoint = {
  duration: number;
  pnl: number;
};

const trades: TradePoint[] = [
  { duration: 40, pnl: -10 },
  { duration: 55, pnl: 5 },
  { duration: 120, pnl: -30 },
  { duration: 180, pnl: 20 },
  { duration: 300, pnl: -50 },
  { duration: 420, pnl: 140 },
  { duration: 460, pnl: 150 },
  { duration: 480, pnl: -210 },
  { duration: 600, pnl: 10 },
  { duration: 900, pnl: 0 },
  { duration: 2000, pnl: -15 },
  { duration: 2100, pnl: 5 },
  { duration: 3500, pnl: 15 },
  { duration: 3700, pnl: 30 },
  { duration: 3900, pnl: 120 },
];

export default function PnLScatter() {
  return (
    <div>
      <h3 className="text-sm mb-4">PnL by Trade Duration</h3>

      <div className="w-full h-[320px] border border-white/10 rounded-2xl overflow-hidden px-3 pt-6 pb-3">
        <ResponsiveContainer
          className={"-ml-8 "}
          width="100%"
          height={285}
          aspect={undefined}
        >
          <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 40 }}>
            <CartesianGrid
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              dataKey="duration"
              domain={[0, "dataMax"]}
              tickFormatter={formatDuration}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[-250, 200]}
              tickFormatter={(v) => `$${v}`}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <ReferenceLine
              y={0}
              stroke="rgba(255,255,255,0.4)"
              strokeDasharray="4 4"
            />

            {/* Profit */}
            <Scatter
              data={trades.filter((t) => t.pnl >= 0)}
              dataKey="pnl"
              fill="#10b981"
            />

            {/* Loss */}
            <Scatter
              data={trades.filter((t) => t.pnl < 0)}
              dataKey="pnl"
              fill="#ff6b6b"
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const { duration, pnl } = payload[0].payload;

                return (
                  <div
                    style={{
                      background: "#1a1a1a",
                      border: "1px solid rgba(45, 55, 72, 1)",
                      borderRadius: "8px",
                      padding: "",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    <div className="bg-gradient-to-br from-green-500/90 to-green-700/90 flex justify-center rounded-t-[8px]">
                      <h4 className="font-medium ">Trade Info</h4>
                    </div>
                    <div className="px-3 py-3 ">
                      <div className="flex justify-between gap-4">
                        <span>Duration:</span>
                        <span>{formatDuration(duration)}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>PnL: </span>
                        <span
                          style={{ color: pnl >= 0 ? "#22c55e" : "#ef4444" }}
                        >
                          {pnl > 0 ? `$${pnl}` : `-$${pnl * -1}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const formatDuration = (sec: number) => {
  if (sec < 60) return `${sec}s`;
  if (sec < 3600) return `${Math.round(sec / 60)}m`;
  return "1h";
};
