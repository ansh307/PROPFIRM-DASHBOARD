"use client";

import React, { useState } from "react";

type Competition = {
  id: string;
  title: string;
  status: "Ongoing" | "Ended" | "Upcoming" | "Cancelled";
  platform: string;
  participants: number;
  endsIn: string;
};

const TABS = [
  "Joined",
  "EpicFundedTraders",
  "Championships",
  "Hosted",
] as const;
type Tab = (typeof TABS)[number];

const DATA: Record<Tab, Competition[]> = {
  Joined: [
    {
      id: "1",
      title: "January 2026 Monthly Competition",
      status: "Ongoing",
      platform: "EFT",
      participants: 15949,
      endsIn: "28:02:07:38",
    },
  ],
  EpicFundedTraders: Array.from({ length: 5 }).map((_, i) => ({
    id: `${i + 1}`,
    title: `EFT Weekly #${i + 1}`,
    status: "Ongoing",
    platform: "EFT",
    participants: 5000 + i * 120,
    endsIn: "12:11:04:20",
  })),
  Championships: [
    {
      id: "champ-1",
      title: "Global Trading Championship",
      status: "Ongoing",
      platform: "MatchTrader",
      participants: 980,
      endsIn: "05:22:11:09",
    },
  ],
  Hosted: [],
};

const CompetitionsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Joined");

  const list: Competition[] = DATA[activeTab];

  return (
    <div className="p-8 space-y-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5 ">
          <span className="text-[#22c55e] text-2xl font-semibold">EFT</span>
          <div className="border-l border-gray-200/10 h-10 w-0.5" />
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--muted-text)",
              border: "1px solid var(--card-border)",
            }}
          >
            A
          </div>
          <h1 className="text-2xl font-semibold">Hey, Ansh</h1>
        </div>
      </div>
      {/* Hero Card */}
      <div className="rounded-2xl p-4  border border-white/10 flex justify-between w-1/2 mx-auto h-[360px]">
        <div className="flex justify-between  rounded-2xl p-6 card-green-premium ">
          <div className="relative z-10 flex w-full max-w-4/5 flex-col justify-between gap-6 md:max-w-3/5">
            <p className="text-sm text-white/90 mb-2 ">Monthly Competition</p>

            <div>
              <h2 className="text-2xl font-bold mb-3">
                January 2026 Monthly Competition
              </h2>

              <div className="flex gap-4 text-sm text-gray-200 mb-4">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Ongoing
                </span>
                <span>matchtrader</span>
                <span>15,947</span>
              </div>
            </div>

            <div className="flex justify-between mr-14">
              <div>
                <h3 className="text-xs text-white/70 mb-1">Starts</h3>
                <p>Jan 1, 2026</p>
              </div>
              <div>
                <h3 className="text-xs text-white/70 mb-1">Ends</h3>
                <p> Jan 31, 2026</p>
              </div>
              <div>
                <h3 className="text-xs text-white/70 mb-1">Ending in</h3>
                <p>28:01:15:49</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-5 py-2 rounded-xl bg-black transition">
                View
              </button>
              <button className="px-5 py-2 rounded-xl hover:bg-black transition">
                Show Pool Prize
              </button>
              <button className="px-5 py-2 rounded-xl hover:bg-black transition">
                More Info
              </button>
            </div>
          </div>

          <div className="max-w-4/5 md:max-w-3/5 opacity-90 translate-x-25 translate-y-10">
            <img src="/images/competitions/trophy.png" alt="trophy" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/10 mt-14 justify-end">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-4 text-sm transition font-semibold ${
              activeTab === tab
                ? "text-white border-b-2 border-green-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      {list.length === 0 ? (
        <div className="text-gray-400 text-sm">No competitions available.</div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {list.map((c) => (
            <CompetitionCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitionsPage;

const CompetitionCard = ({ c }: { c: Competition }) => {
  return (
    <div className="rounded-2xl card-premium p-5 w-full">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
          {c.endsIn}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2">{c.title}</h3>

      <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          {c.status}
        </span>
        <span>•</span>
        <span>{c.platform}</span>
        <span>•</span>
        <span>{c.participants.toLocaleString()}</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-white/5 text-xs">EFT</span>
          <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
            matchtrader
          </span>
        </div>

        <button className="px-4 py-2 rounded-xl text-black font-semibold transition text-sm bg-green-600">
          View
        </button>
      </div>
    </div>
  );
};
