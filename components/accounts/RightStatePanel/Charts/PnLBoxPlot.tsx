import { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
  Scatter,
  RectangleProps,
} from "recharts";

/* =======================
   Types
======================= */

export type BoxPlot = {
  label: string;
  min: number;
  lowerQuartile: number;
  median: number;
  upperQuartile: number;
  max: number;
  average?: number;
};

type BoxPlotData = {
  label: string;
  min: number;
  bottomWhisker: number;
  bottomBox: number;
  topBox: number;
  topWhisker: number;
  average?: number;
  size: number;
};

/* =======================
   Shapes
======================= */

const MedianLine = ({ x, y, width }: RectangleProps) => {
  if (x == null || y == null || width == null) return null;

  return (
    <line
      x1={x}
      x2={x + width}
      y1={y}
      y2={y}
      stroke="#e5e7eb"
      strokeWidth={2}
    />
  );
};

const Whisker = ({ x, y, width, height }: RectangleProps) => {
  if (x == null || y == null || width == null || height == null) return null;

  return (
    <line
      x1={x + width / 2}
      x2={x + width / 2}
      y1={y}
      y2={y + height}
      stroke="#9ca3af"
      strokeWidth={2}
      strokeDasharray="4 4"
    />
  );
};

/* =======================
   Hook
======================= */

const useBoxPlotData = (data: BoxPlot[]): BoxPlotData[] =>
  useMemo(
    () =>
      data.map((d) => ({
        label: d.label,
        min: d.min,
        bottomWhisker: d.lowerQuartile - d.min,
        bottomBox: d.median - d.lowerQuartile,
        topBox: d.upperQuartile - d.median,
        topWhisker: d.max - d.upperQuartile,
        average: d.average,
        size: 120,
      })),
    [data]
  );

/* =======================
   Component
======================= */

type Props = {
  data: BoxPlot[];
  height?: number;
};

export function PnLBoxPlot({ data, height = 320 }: Props) {
  const chartData = useBoxPlotData(data);

  return (
    <div className="h-[320px]">
      <h1 className="text-sm mb-4">PnL Distribution by Duration</h1>
      <div className="border border-white/10  rounded-2xl overflow-hidden px-3 pt-6 pb-3 h-full">
        <ResponsiveContainer
          width="100%"
          height={280}
          aspect={undefined}
          className={"-ml-4 "}
        >
          <ComposedChart data={chartData} barCategoryGap={30}>
            <CartesianGrid
              stroke="#1f2937"
              strokeDasharray="3 3"
              vertical={false}
            />

            {/* Invisible base */}
            <Bar stackId="a" dataKey="min" fill="transparent" />

            {/* Bottom whisker */}
            <Bar stackId="a" dataKey="bottomWhisker" shape={<Whisker />} />

            {/* Bottom box */}
            <Bar
              stackId="a"
              dataKey="bottomBox"
              fill="#ef4444"
              radius={[0, 0, 4, 4]}
            />

            {/* Median */}
            <Bar stackId="a" shape={<MedianLine />} />

            {/* Top box */}
            <Bar
              stackId="a"
              dataKey="topBox"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
            />

            {/* Top whisker */}
            <Bar stackId="a" dataKey="topWhisker" shape={<Whisker />} />

            {/* Average dot */}
            <ZAxis type="number" dataKey="size" range={[60, 120]} />
            <Scatter dataKey="average" fill="#e5e7eb" />

            <XAxis
              dataKey="label"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
