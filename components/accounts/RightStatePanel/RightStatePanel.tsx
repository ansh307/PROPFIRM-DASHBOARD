"use client";
import { useParams, useRouter } from "next/navigation";
import { LuDollarSign } from "react-icons/lu";
import { initialAccounts } from "../AccountsData";
import RadarPerfChart from "./Charts/RadarPerfChart";
import { FiTrendingUp, FiTrendingDown, FiHash } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import { IconType } from "react-icons";
import { FiTarget } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";
import SpeedometerChart from "./Charts/SpeedometerChart";
import { PnLBoxPlot } from "./Charts/PnLBoxPlot";
import PnLScatter from "./Charts/PnLScatter";
import InstrumentBarChart from "./Charts/InstrumentBarChart";
import TradingTable from "./TradingTable";
import DailySummaryCalendar from "./DailySummaryCalendar";
import AccountBalanceChart from "./Charts/AccountBalanceChart";

const BoxPlotData = [
  {
    label: "1m 51s",
    min: -20,
    lowerQuartile: -5,
    median: -2,
    upperQuartile: 10,
    max: 20,
    average: 3,
  },
  {
    label: "4m 57s",
    min: -40,
    lowerQuartile: -10,
    median: 5,
    upperQuartile: 50,
    max: 100,
    average: 20,
  },

  {
    label: "14m 58s",
    min: -90,
    lowerQuartile: -20,
    median: 5,
    upperQuartile: 50,
    max: 60,
    average: 20,
  },
  {
    label: "38m 36s",
    min: -70,
    lowerQuartile: -40,
    median: 5,
    upperQuartile: 60,
    max: 80,
    average: 20,
  },
  {
    label: "1h",
    min: -40,
    lowerQuartile: -10,
    median: 5,
    upperQuartile: 20,
    max: 70,
    average: 20,
  },
];

const InstrumentProfitAnalysisData = [
  { instrument: "DJI30", value: 200 },
  { instrument: "XAUUSD", value: 350 },
];

const InstrumentVolumeAnalysisData = [
  { instrument: "DJI30", value: 1.5 },
  { instrument: "XAUUSD", value: 4.5 },
];

const DailySummaryCalendarData = [
  {
    balance: "10563.78",
    date: "2026-01-06",
    lot_size: "0.01",
    profit: "-0.53",
    trades: 1,
    trading_day: true,
  },
  {
    balance: "10563.78",
    date: "2026-01-05",
    lot_size: "0.71",
    profit: "37.64",
    trades: 3,
    trading_day: true,
  },
  {
    balance: "10526.67",
    date: "2026-01-02",
    lot_size: "5.36",
    profit: "526.67",
    trades: 45,
    trading_day: true,
  },
];

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

const RightStatePanel = () => {
  const { accountId } = useParams();

  const router = useRouter();

  const selectedAccount = initialAccounts.find((acc) => {
    if (acc.id === accountId) {
      return acc;
    }
  });

  if (selectedAccount) {
    return (
      <div className="space-y-8  p-8 ml-[480px]">
        {/* breadcrums */}
        <div className="flex items-center space-x-3 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">{">"}</span>
          <span className="text-gray-400">Account</span>
          <span className="text-gray-400">{">"}</span>
          <span className="text-white"> #{selectedAccount.id}</span>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex gap-x-6 items-center">
            <h1 className="text-lg font-bold">#{selectedAccount.id}</h1>
            <p className="text-xs text-gray-400">Created Jan 1, 2026</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="space-x-4 flex text-xs text-gray-300">
              <div className="border border-green-600/50 rounded-full py-0.5 px-2.5 text-green-300">
                New
              </div>
              <div className="border border-white/20 bg-gray-400/5 rounded-full py-0.5 px-3">
                2-step
              </div>
              <div className="border border-white/20 bg-gray-400/5 rounded-full py-0.5 px-3">
                Student
              </div>
              <div className="border border-white/20 bg-gray-400/5 rounded-full py-0.5 px-3">
                Meta Trader 5
              </div>
            </div>
            <div className="space-x-3">
              <button
                className="  bg-white/5 border border-white/10 text-sm text-white
               hover:bg-white/10 hover:border-white/20
               transition  rounded-lg px-4 py-2"
              >
                Share
              </button>
              <button
                className="  bg-white/5 border border-white/10 text-sm text-white
               hover:bg-white/10 hover:border-white/20
               transition  rounded-lg px-4 py-2"
              >
                Credentials
              </button>
            </div>
          </div>
        </div>

        {/* Top summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Account Size"
            Icon={LuDollarSign}
            value={`$${selectedAccount.balance.toLocaleString()}`}
          />
          <StatCard
            title="PnL"
            Icon={FiTrendingUp}
            value={`$${selectedAccount.profitPct.toLocaleString()}`}
          />
          <StatCard
            title="Start Date"
            value="Jan 1, 2026"
            Icon={MdOutlineDateRange}
          />
          <StatCard
            title="End Date"
            value="Jan 31, 2026"
            Icon={MdOutlineDateRange}
          />
        </div>

        {/* Middle section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Score Card */}
          <div className="lg:col-span-2 rounded-2xl card-green-premium p-6 text-white flex">
            <div className="flex flex-col justify-between items-start ">
              <p className="text-base font-semibold">Score</p>
              <h2 className="text-4xl font-bold mt-2">2.08</h2>
            </div>
            <RadarPerfChart consistency={82} slUsage={70} wr={65} rr={70} />
          </div>

          {/* Balance Panel */}
          <div className="lg:col-span-2 rounded-2xl p-6 text-white card-premium">
            <BalanceRow
              title="Balance"
              value={10050.0}
              min={10000.0}
              max={10000.0}
              accountOf={10000}
              percentage={5}
            />
            <div className="my-6 border-t border-white/10" />
            <BalanceRow
              title="Equity"
              value={10050.0}
              min={10000.0}
              max={10000.0}
              accountOf={10000}
              percentage={5}
            />
          </div>
        </div>

        {/* Account balance chart placeholder */}
        <AccountBalanceChart data={AccountBalanceChartData} />

        {/* Performance stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
          <StatCard title="Average Win" value="$0.00" Icon={FiTrendingUp} />
          <StatCard title="Win Ratio" value="—" Icon={FiTarget} />
          <StatCard title="Average Loss" value="$0.00" Icon={FiTrendingDown} />
          <StatCard title="Profit Factor" value="—" Icon={VscGraph} />
        </div>

        {/* Trading Objectives */}
        <div className="space-y-6">
          <h2 className="text-sm font-medium text-white">Trading Objectives</h2>

          <div className="space-y-4">
            {/* Maximum Daily Loss */}
            <ObjectiveCard
              title="Maximum Daily Loss"
              meta={[
                "Maximum Allowed Daily Loss: $5,000.00",
                "Today's Starting Equity: $100,000.00",
                "Balance Threshold: $95,000.00",
              ]}
              remaining={5000}
              progress={5}
              reset="20:50:47"
            />

            {/* Maximum Loss */}
            <ObjectiveCard
              title="Maximum Loss"
              meta={[
                "Maximum Allowed Loss: $10,000.00",
                "Balance Threshold: $90,000.00",
              ]}
              remaining={10000}
              progress={10}
            />
          </div>
        </div>

        {/* Daily summmary */}
        <DailySummaryCalendar data={DailySummaryCalendarData} />

        {/* Advanced Trading Stats */}
        <div className="space-y-8">
          <div className="space-y-2.5">
            {/* Top metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <StatCard
                title="Number of days"
                value="0"
                Icon={MdOutlineDateRange}
              />
              <StatCard title="Total Trades Taken" value="0" Icon={FiHash} />
              <StatCard title="Total Lots Used" value="0.00" Icon={VscGraph} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <StatCard title="Biggest Win" value="$0.00" Icon={FiTrendingUp} />
              <StatCard
                title="Biggest Loss"
                value="$0.00"
                Icon={FiTrendingDown}
              />
              <div className="hidden md:block" />
            </div>
          </div>

          {/* Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
            <SpeedometerChart
              title="Short Analysis"
              profit={526.67}
              winRate={63.64}
              wins={28}
              winAmount={984.83}
              losses={16}
              lossAmount={458.16}
            />
            <SpeedometerChart
              title="Short Analysis"
              profit={526.67}
              wins={28}
              winAmount={984.83}
              losses={16}
              lossAmount={458.16}
              totalTrades={45}
            />
            <SpeedometerChart
              title="Long Analysis"
              profit={526.67}
              winRate={0}
              wins={0}
              winAmount={984.83}
              losses={1}
              lossAmount={458.16}
            />
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className="space-y-8">
          {/* Charts grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PnLBoxPlot data={BoxPlotData} />

            <PnLScatter />

            <InstrumentBarChart
              title="Instrument Profit Analysis"
              data={InstrumentProfitAnalysisData}
              yAxisLabel="Profit"
            />
            <InstrumentBarChart
              title="Instrument Volume Analysis"
              data={InstrumentVolumeAnalysisData}
              yAxisLabel="Volume"
            />
          </div>

          <TradingTable />
        </div>
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center ml-[480px] h-screen">
      <div
        className="max-w-md text-center border border-white/10 rounded-2xl p-10"
        style={{
          backgroundColor: "var(--card-bg)",
        }}
      >
        <h2 className="text-xl font-semibold mb-3">
          Select an Account to View Details
        </h2>
        <p className="text-gray-400 mb-6">
          Choose a trading account from the list to see its detailed information
          and performance metrics.
        </p>

        <button
          onClick={() => router.push("/new-challenge")}
          className="w-full bg-gradient-to-br from-green-500/90 to-green-700/90 hover:from-green-500/100 hover:to-green-700/100 transition py-3 rounded-xl font-semibold"
        >
          BUY CHALLENGE
        </button>
      </div>
    </div>
  );
};

export default RightStatePanel;

const StatCard = ({
  title,
  value,
  Icon,
}: {
  title: string;
  value: string;
  Icon?: IconType;
}) => {
  return (
    <div className="rounded-xl  p-4 text-white card-premium">
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        {Icon && <Icon size={16} />}
        <span>{title}</span>
      </div>
      <p className="text-xl font-semibold mt-2">{value}</p>
    </div>
  );
};

const BalanceRow = ({
  title,
  value,
  min,
  max,
  accountOf,
  percentage,
}: {
  title: string;
  value: number;
  min: number;
  max: number;
  accountOf: number;
  percentage: number;
}) => {
  const target = accountOf + (accountOf * percentage) / 100;

  // Clamp progress between 0 and 100
  const progress =
    value <= accountOf
      ? 0
      : value >= target
      ? 100
      : ((value - accountOf) / (target - accountOf)) * 100;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-lg font-semibold">${value}</p>
      </div>
      {/* Progress Bar */}
      <div className="w-full mb-3">
        <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
          {/* Progress fill */}
          <div
            className="h-full bg-green-600 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />

          {/* Indicator dot */}
          {progress > 0 && (
            <span
              className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-black -translate-y-1/2"
              style={{ left: `calc(${progress}% - 11px)` }}
            />
          )}
        </div>
      </div>
      {/* Min / Target */}
      <div className="flex justify-between text-xs">
        <span className="text-red-400">Min ${min}</span>
        <span className="text-green-400">Max ${max}</span>
      </div>
    </div>
  );
};

const ObjectiveCard = ({
  title,
  meta,
  remaining,
  progress,
  reset,
}: {
  title: string;

  meta: string[];
  remaining: number;
  progress: number; // 0–100
  reset?: string;
}) => (
  <div className="rounded-xl border border-white/10  p-6 text-white">
    <div className="flex justify-between items-start mb-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">{title}</h3>

          {reset && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-green-600/50 text-green-100/90 bg-green-600/15">
              Resets In: {reset}
            </span>
          )}
        </div>
      </div>

      <p className="text-sm font-medium">Remaining: ${remaining}</p>
    </div>

    <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-3">
      {meta.map((m) => (
        <span key={m}>{m}</span>
      ))}
    </div>

    {/* Progress bar */}
    <div className="relative h-4 rounded-full bg-white/5 overflow-hidden">
      {/* Progress fill */}
      <div
        className="h-full bg-green-600 transition-all duration-500 rounded-full"
        style={{ width: `${progress}%` }}
      />
      {/* Indicator dot */}
      {progress > 0 && (
        <span
          className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-black -translate-y-1/2"
          style={{ left: `calc(${progress}% - 11px)` }}
        />
      )}
    </div>
  </div>
);
