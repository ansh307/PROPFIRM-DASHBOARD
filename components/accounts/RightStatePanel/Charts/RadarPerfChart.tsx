"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function RadarPerfChart({
  consistency,
  slUsage,
  wr,
  rr,
}: {
  consistency?: number;
  slUsage?: number;
  wr?: number;
  rr?: number;
}) {
  const data = [
    { metric: "Consistency", value: consistency || 82 },
    { metric: "SL Usage", value: slUsage || 70 },
    { metric: "WR", value: wr || 65 },
    { metric: "RR", value: rr || 78 },
  ];
  return (
    <div className="w-full h-56">
      <ResponsiveContainer
        width="100%"
        height={224}
        className={"pointer-events-none"}
        aspect={undefined}
      >
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.35)" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: "rgba(255,255,255,0.9)", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />

          <Radar
            name="Performance"
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
            fill="#22c55e"
            strokeOpacity={0.8}
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
