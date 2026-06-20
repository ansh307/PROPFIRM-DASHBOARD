"use client";

import { log } from "console";
import { useEffect, useState } from "react";

type LeaderboardRow = {
  rank: number;
  trader_name: string;
  profit: number;
  profit_percentage: number;
  win_ratio_percentage: number;
  pair: string;
  average_win: number;
  average_loss: number;
  average_duration: number;
  trades: number;
  loosing_streak: number;
  winning_streak: number;
};

type LeaderboardResponse = {
  highlights: any;
  leaderboard: {
    entries: LeaderboardRow[];
  };
};

const ACCOUNT_SIZES = [
  { label: "5k", value: 5000 },
  { label: "10k", value: 10000 },
  { label: "25k", value: 25000 },
  { label: "50k", value: 50000 },
  { label: "100k", value: 100000 },
  { label: "All", value: null },
];

const LeaderboardPage = () => {
  const [accountSize, setAccountSize] = useState<number | null>(10000);
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);

      const url = accountSize
        ? `/api/leaderboard?account_size=${accountSize}`
        : `/api/leaderboard`;

      const res = await fetch(url);
      const json = await res.json();
      setData(json?.data ?? json ?? []);

      setLoading(false);
    };

    fetchLeaderboard();
  }, [accountSize]);

  const formatMoney = (amount?: string, currency = "USD") =>
    amount ? `$${Number(amount).toLocaleString()}` : "--";

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

        {/* Account Size Tabs */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400 mr-2">Account Size:</span>
          {ACCOUNT_SIZES.map((s) => (
            <button
              key={s.label}
              onClick={() => setAccountSize(s.value)}
              className={`px-3 py-1 rounded-full transition ${
                accountSize === s.value
                  ? "bg-gradient-to-br from-green-600 to-green-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <p className="p-6 text-center text-gray-400">Loading cards…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Highest Total Rewards */}
          <div className="relative rounded-2xl p-5 flex items-center gap-4 card-green-premium">
            <div className="text-4xl">🏆</div>

            <div>
              <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                Highest Total Rewards
              </p>

              <p className="text-2xl font-bold text-white">
                {formatMoney(data?.highlights?.highest_total_rewards?.amount)}
              </p>

              <p className="text-sm text-white/80 mt-1 flex items-center gap-2 font-semibold">
                {data?.highlights?.highest_total_rewards?.trader?.name}
                <span className="text-base">🇮🇳</span>
              </p>
            </div>
          </div>

          {/* Longest Master Account Duration */}
          <div className="relative rounded-2xl p-5 flex items-center gap-4 card-green-premium">
            <div className="text-4xl">📅</div>

            <div>
              <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                Longest Master Acc Duration
              </p>

              <p className="text-2xl font-bold text-white">
                {data?.highlights?.longest_master_account_duration?.days} days
              </p>

              <p className="text-sm text-white/80 mt-1 flex items-center gap-2 font-semibold">
                {
                  data?.highlights?.longest_master_account_duration?.trader
                    ?.name
                }
                <span>🇮🇳</span>
              </p>
            </div>
          </div>

          {/* Highest Single Reward */}
          <div className="relative rounded-2xl p-5 flex items-center gap-4 card-green-premium">
            <div className="text-4xl">🪙</div>

            <div>
              <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                Highest Single Reward
              </p>

              <p className="text-2xl font-bold text-white">
                {formatMoney(data?.highlights?.highest_single_reward?.amount)}
              </p>

              <p className="text-sm text-white/80 mt-1 flex items-center gap-2 font-semibold">
                {data?.highlights?.highest_single_reward?.trader?.name}
                <span>🇪🇸</span>
              </p>
            </div>
          </div>

          {/* Total Reward Count */}
          <div className="relative rounded-2xl p-5 flex items-center gap-4 card-green-premium">
            <div className="text-4xl">💰</div>

            <div>
              <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                Highest Total Rewards Count
              </p>

              <p className="text-2xl font-bold text-white">
                {data?.highlights?.total_reward_count?.total_rewards}
              </p>

              <p className="text-sm text-white/80 mt-1 flex items-center gap-2 font-semibold  ">
                {data?.highlights?.total_reward_count?.trader?.name}
                <span>🇧🇬</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-xl font-semibold">Leaderboard</h1>
      {/* Table */}
      <div className="rounded-2xl overflow-hidden card-premium">
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="p-4 text-left">Rank</th>
              <th className="text-left">Trader</th>
              <th className="text-left">Profit</th>
              <th className="text-left">Profit %</th>
              <th className="text-left">Win Ratio</th>
              <th className="text-left">Pair</th>
              <th className="text-left">Avg Win</th>
              <th className="text-left">Avg Loss</th>
              <th className="text-left">Avg Duration</th>
              <th className="text-left">Trades</th>
              <th className="text-left">Losing</th>
              <th className="text-left">Winning</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={12} className="p-6 text-center text-gray-400">
                  Loading leaderboard…
                </td>
              </tr>
            ) : (
              data &&
              data?.leaderboard?.entries?.map((row) => (
                <tr
                  key={row.rank}
                  className="border-t border-white/5 hover:bg-white/2"
                >
                  <td className="p-4 font-semibold">#{row.rank}</td>
                  <td>{row.trader_name}</td>

                  <td className="text-green-400 font-medium">
                    +${row.profit.toLocaleString()}
                  </td>

                  <td className="text-green-400">+{row.profit_percentage}%</td>

                  <td>{row.win_ratio_percentage}%</td>

                  <td>
                    <span className="px-2 py-1 rounded bg-blue-900/40 text-blue-300">
                      {row.pair}
                    </span>
                  </td>

                  <td className="text-green-400">
                    ${row.average_win.toFixed(2)}
                  </td>

                  <td className="text-red-400">
                    -${row.average_loss.toFixed(2)}
                  </td>

                  <td>{row.average_duration}</td>
                  <td>{row.trades}</td>

                  <td className="text-red-400">{row.loosing_streak}</td>

                  <td className="text-green-400">{row.winning_streak}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
