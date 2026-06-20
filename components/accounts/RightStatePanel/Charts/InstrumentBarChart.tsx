"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type InstrumentData = {
  instrument: string;
  value: number;
};

type InstrumentBarChartProps = {
  title: string;
  data: InstrumentData[];
  barColor?: string;
  yAxisLabel?: string;
  height?: number;
};

export default function InstrumentBarChart({
  title,
  data,
  barColor = "#22c55e", // emerald / green
  yAxisLabel,
  height = 320,
}: InstrumentBarChartProps) {
  return (
    <div className="">
      <h2 className="text-sm font-medium text-white/80 mb-4">{title}</h2>

      <div
        style={{ width: "100%", height }}
        className="rounded-2xl border border-white/10 p-6"
      >
        <ResponsiveContainer
          width="100%"
          height={280}
          aspect={undefined}
          className={"-ml-4"}
        >
          <BarChart data={data} barSize={48}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
              vertical={false}
            />

            <XAxis
              dataKey="instrument"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" fill={barColor} radius={[10, 10, 10, 10]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
