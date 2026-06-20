type CenterProgressProps = {
  /** Range: -100 to 100 */
  value: number;
};

export function CenterProgress({ value }: CenterProgressProps) {
  const clamped = Math.max(-100, Math.min(100, value));
  const isPositive = clamped >= 0;
  const width = Math.abs(clamped) / 2; // half bar on each side

  return (
    <div
      className="relative h-4 rounded-full overflow-hidden"
      style={{ backgroundColor: "#2F3135" }}
    >
      {/* Center Divider */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 bg-white z-10" />

      {/* Progress */}
      <div
        className={`absolute top-0 h-full transition-all duration-500 ease-out ${
          isPositive ? "rounded-r-full " : "rounded-l-full "
        }`}
        style={{
          width: `${width}%`,
          left: isPositive ? "50%" : undefined,
          right: !isPositive ? "50%" : undefined,
          backgroundColor: isPositive ? "#00953d" : "#00953d",
        }}
      />

      {/* Dot (optional – like image) */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black ${
          isPositive ? "-translate-x-3" : "translate-x-2"
        }`}
        style={{
          left: `calc(50% + ${isPositive ? width : -width}%)`,
        }}
      />
    </div>
  );
}
