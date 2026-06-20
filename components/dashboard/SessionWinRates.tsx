"use client";

const sessions = [
  { name: "New York", value: 79.1 },
  { name: "London", value: 60.7 },
  { name: "Asia", value: 10 },
];

export default function SessionWinRates() {
  const lastIndexoOfData = sessions.length;
  return (
    <div className="col-span-7 rounded-xl p-5 transition-colors card-premium">
      <p className="text-sm mb-5 text-white/50">Session Win Rates</p>

      <div className="space-y-5">
        {sessions.map((session, index) => (
          <div key={session.name}>
            <div className="flex items-center gap-4">
              {/* Label */}
              <span
                className="text-sm w-20"
                style={{ color: "var(--foreground)" }}
              >
                {session.name}
              </span>

              {/* Bar */}
              <div className="relative flex-1 h-4 rounded-full overflow-hidden bg-[#2F3135]">
                {/* Filled */}
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-[#22c55e]"
                  style={{ width: `${session.value}%` }}
                />

                {/* Dot */}
                {session.value > 0 && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-2 w-2 h-2 rounded-full bg-black"
                    style={{ left: `calc(${session.value}% - 4px)` }}
                  />
                )}
              </div>

              {/* Percentage */}
              <span
                className="text-sm w-12 text-right"
                style={{ color: "var(--foreground)" }}
              >
                {session.value.toFixed(1)}%
              </span>
            </div>
            {index !== lastIndexoOfData - 1 && (
              <div className="w-full border-b border-white/5 my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
