"use client";

import { useEffect, useState } from "react";

type Event = {
  time: string;
  currency: string;
  event: string;
  impact: string;
  previous: string;
  forecast: string;
};

const MOCK_EVENTS: Event[] = [
  {
    time: "3:30 PM",
    currency: "CAD",
    event: "Manufacturing PMI",
    impact: "High Impact",
    previous: "48.4",
    forecast: "",
  },
  {
    time: "3:45 PM",
    currency: "USD",
    event: "Final Manufacturing PMI",
    impact: "Medium Impact",
    previous: "51.8",
    forecast: "51.8",
  },
  {
    time: "4:15 PM",
    currency: "USD",
    event: "FOMC Member Paulson Speaks",
    impact: "High Impact",
    previous: "",
    forecast: "",
  },
  {
    time: "5:00 PM",
    currency: "EUR",
    event: "ECB Interest Rate Decision",
    impact: "High Impact",
    previous: "4.50%",
    forecast: "4.50%",
  },
  {
    time: "6:30 PM",
    currency: "GBP",
    event: "GDP q/q",
    impact: "Medium Impact",
    previous: "0.1%",
    forecast: "0.2%",
  },
  {
    time: "7:00 PM",
    currency: "USD",
    event: "Crude Oil Inventories",
    impact: "Low Impact",
    previous: "-3.2M",
    forecast: "-1.5M",
  },
];

const EconomicCalendarPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [impactFilter, setImpactFilter] = useState<string[]>([
    "High",
    "Medium",
    "Low",
  ]);
  const [showPastEvents, setShowPastEvents] = useState(false);

  useEffect(() => {
    // TEMP: use mock data
    setEvents(MOCK_EVENTS);

    // REAL API (enable later)
    // fetch("/api/calendar")
    //   .then((res) => res.json())
    //   .then(setEvents);
  }, []);

  const filtered = events.filter(
    (e) =>
      e.currency === currency && impactFilter.some((i) => e.impact?.includes(i))
  );

  return (
    <div className="p-8 space-y-6 text-white">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Economic Calendar</h1>

      {/* Filters */}
      <div className=" p-4 rounded-xl card-premium">
        <h2 className="text-lg font-medium mb-4 font-semibold">Filters</h2>
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-4">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-white/3 px-3 py-2 rounded-lg w-48 border border-white/10 cursor-pointer"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>JPY</option>
            </select>

            <div className="bg-white/4 px-3 py-1 rounded-full">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((c) => (
                <button
                  key={c}
                  className={`px-3 py-1 rounded-full text-xs font-semibold hover:bg-[#22c55e] hover:text-black`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {["High", "Medium", "Low", "impact"].map((i) => (
              <button
                key={i}
                onClick={() =>
                  setImpactFilter((prev) =>
                    prev.includes(i)
                      ? prev.filter((x) => x !== i)
                      : [...prev, i]
                  )
                }
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  i === "High"
                    ? "bg-red-700/80 text-red-200"
                    : i === "Medium"
                    ? "bg-yellow-700/80 text-yellow-200"
                    : i === "Low"
                    ? "bg-green-600/80 text-green-200"
                    : "bg-gray-600/80 text-gray-200"
                }`}
              >
                {i} Impact
              </button>
            ))}
            <div className="flex items-center gap-3 ml-2">
              <button
                onClick={() => setShowPastEvents((prev) => !prev)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-300
                          ${showPastEvents ? "bg-[#22c55e]" : "bg-gray-600"}
                        `}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full  transition-transform duration-300
                              ${
                                showPastEvents
                                  ? "translate-x-5 bg-black"
                                  : "translate-x-0 bg-white"
                              }
                            `}
                />
              </button>
              <span className="text-sm text-gray-300">Show Past Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className=" overflow-hidden ">
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="p-4 text-left font-light">Time</th>
              <th className="text-left font-light">Currency</th>
              <th className="text-left font-light">Event</th>
              <th className="text-left font-light">Previous</th>
              <th className="text-left font-light">Forecast</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, idx) => (
              <tr
                key={idx}
                className="border-t border-white/5 hover:bg-white/3"
              >
                <td className="p-4">{e.time}</td>
                <td>{e.currency}</td>
                <td>{e.event}</td>
                <td>{e.previous || "--"}</td>
                <td>{e.forecast || "--"}</td>
                <td className="pr-4">
                  <button className="px-3 py-1 rounded-lg bg-[#232323]">
                    Add to Calendar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EconomicCalendarPage;
