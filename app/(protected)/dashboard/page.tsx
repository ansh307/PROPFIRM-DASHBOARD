import { currentUser } from "@clerk/nextjs/server";
import { FaClock } from "react-icons/fa";
import { GiChargingBull, GiBearFace } from "react-icons/gi";
import { IoShareSocialSharp } from "react-icons/io5";
import { HiOutlineShieldCheck } from "react-icons/hi";
import RadarPerfChart from "@/components/accounts/RightStatePanel/Charts/RadarPerfChart";
import Image from "next/image";
import { CenterProgress } from "@/components/dashboard/CenterProgress";
import TradingDayPerformance from "@/components/dashboard/TradingDayPerformance";
import ProfitabilitySpeedometerChart from "@/components/dashboard/ProfitabilitySpeedometerChart";
import MostTradedInstruments from "@/components/dashboard/MostTradedInstruments";
import SessionWinRates from "@/components/dashboard/SessionWinRates";
import Link from "next/link";
import AccountBalanceChart from "@/components/accounts/RightStatePanel/Charts/AccountBalanceChart";

const AccountBalanceChartData = [
  {
    date: "2025-12-30T19:56:23.427Z",
    balance: "10119.37",
    equity: "10198.29",
  },
  {
    date: "2025-12-30T20:04:47.199Z",
    balance: "10195.29",
    equity: "10195.29",
  },
  {
    date: "2025-12-30T21:04:35.898Z",
    balance: "10193.59",
    equity: "10121.49",
  },
  {
    date: "2025-12-30T22:03:28.660Z",
    balance: "10527.99",
    equity: "10527.99",
  },
  {
    date: "2025-12-30T23:04:11.076Z",
    balance: "10527.99",
    equity: "10527.99",
  },
];

const Dashboard = async () => {
  const user = await currentUser();
  const userName = user?.firstName || "User";

  return (
    <div
      className="h-screen overflow-x-hidden p-8  transition-colors"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Header Row 1 */}
      <div className="flex items-center gap-6 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--muted-text)",
            border: "1px solid var(--card-border)",
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </div>
        <h1
          className="text-2xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Hey, {userName}
        </h1>
      </div>

      {/* Header Row 2 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[#22c55e] font-semibold">EFT</span>
          </div>
          <span
            className="font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Trader Summary
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full transition-colors"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--muted-text)",
              border: "1px solid var(--card-border)",
            }}
          >
            Total Allocation: $0.00
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={"/new-challenge"}
            className="font-semibold px-5 py-2 rounded-md flex items-center gap-2 text-sm text-black hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--primary-green)" }}
          >
            <HiOutlineShieldCheck className="text-lg" /> BUY CHALLENGE
          </Link>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors hover:opacity-80"
            style={{
              color: "var(--muted-text)",
              border: "1px solid var(--card-border)",
            }}
          >
            <IoShareSocialSharp /> Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-325px)]">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="rounded-xl px-6 py-5.75 relative overflow-hidden card-premium">
            {/* Metrics */}
            <div className="grid grid-cols-4 ">
              {/* PnL */}
              <div className="pr-6 border-r border-white/5">
                <p className="text-white/50 mb-1">PnL Today</p>
                <p className="text-4xl font-semibold text-green-400">+$90</p>
              </div>

              {/* Win Rate */}
              <div className="px-8 border-r border-white/5">
                <p className="text-white/50 mb-1">Win Rate Today</p>
                <p className="text-4xl font-semibold text-white">66%</p>
              </div>

              {/* Trades */}
              <div className="px-8 border-r border-white/5">
                <p className="text-white/50 mb-1">Trades Taken</p>
                <p className="text-4xl font-semibold text-white">3</p>
              </div>

              {/* Rule Violations */}
              <div className="pl-6">
                <p className="text-white/50 mb-1">Rule Violations</p>
                <p className="text-4xl font-semibold text-green-400 flex items-center gap-1">
                  0 <span className="text-green-400">✔</span>
                </p>
              </div>
            </div>
          </div>

          {/* Account balance chart placeholder */}
          <AccountBalanceChart
            heading={false}
            chartClassName="card-premium"
            data={AccountBalanceChartData}
          />
        </div>
        <div className="col-span-4 space-y-4">
          {/* Trading Day Performance */}
          <TradingDayPerformance />
          <div className=" rounded-xl p-5 transition-colors flex flex-col justify-between card-premium">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-white/50">Behavioral Bias</span>
              <span className="text-lg text-white/50">
                Total Trades:{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  0
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col items-center">
                <Image
                  src={"/images/dashboard/bearicon-new.ico"}
                  width={120}
                  height={120}
                  alt="bear icon"
                />
              </div>
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                Neutral
              </span>
              <div className="flex flex-col items-center">
                <Image
                  src={"/images/dashboard/bullicon-new.ico"}
                  width={120}
                  height={120}
                  alt="bear icon"
                />
              </div>
            </div>

            <div>
              <CenterProgress value={-80} />
              <div
                className="flex justify-between text-sm mt-2"
                style={{ color: "var(--muted-text)" }}
              >
                <span>0 (50.0%)</span>
                <span>0 (50.0%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4 ">
        {/* Bronze Level Card */}
        <div className="col-span-5 rounded-xl p-5 relative overflow-hidden h-[22.25vh] card-premium">
          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Top */}
            <div>
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                Trader Level
              </p>

              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-bold">Bronze</h3>
                {/* <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/20">
                  Beginner
                </span> */}
              </div>

              {/* Progress */}
              <div className="mt-4">
                {/* <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress to Silver</span>
                  <span>0 / 5 Rewards</span>
                </div> */}
                <div className="relative flex-1 h-4 rounded-full overflow-hidden bg-[#2F3135]">
                  {/* Filled */}
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-[#22c55e]"
                    style={{ width: `10%` }}
                  />

                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-2 w-2 h-2 rounded-full bg-black"
                    style={{ left: `calc(10% - 4px)` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-3 gap-6 text-sm mt-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">Total Rewards</p>
                <p className="text-lg font-semibold">$0.00</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Highest Reward</p>
                <p className="text-lg font-semibold">$0.00</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Rewards Earned</p>
                <p className="text-lg font-semibold">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profitability Card */}
        <ProfitabilitySpeedometerChart />

        {/* Most Traded 3 Instruments */}
        <MostTradedInstruments />

        {/* Session Win Rates */}
        <SessionWinRates />
      </div>
    </div>
  );
};

export default Dashboard;
