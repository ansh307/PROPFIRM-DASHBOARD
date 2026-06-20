// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const accountSize = searchParams.get("account_size");

//   const url = accountSize
//     ? `https://backend.fundingpips.com/api/v2/leaderboard?account_size=${accountSize}`
//     : `https://backend.fundingpips.com/api/v2/leaderboard`;

//   const res = await fetch(url, {
//     headers: {
//       "User-Agent": "Mozilla/5.0",
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return NextResponse.json(
//       { error: "Failed to fetch leaderboard" },
//       { status: res.status }
//     );
//   }

//   const data = await res.json();
//   return NextResponse.json(data);
// }


import { NextResponse } from "next/server";

const FAKE_TRADERS = [
  "Oleksandr M",
  "Rezghani Y",
  "MD S",
  "Jonah S",
  "Kipras M",
  "Gert D",
  "Misha M",
  "Paulos H",
  "Rashad K",
  "Lesiba M",
];

function createMockResponse(accountSize: number | null) {
  const base = accountSize ?? 100000;

  return {
    highlights: {
      highest_total_rewards: {
        amount: (base * 0.7).toFixed(2),
        currency: "USD",
        trader: {
          name: "Muhammed Shafeeque P",
          country_code: "IN",
        },
      },
      longest_master_account_duration: {
        days: Math.floor(300 + Math.random() * 400),
        trader: {
          name: "Abdullahi Y",
          country_code: "NG",
        },
      },
      highest_single_reward: {
        amount: (base * 0.63).toFixed(2),
        currency: "USD",
        trader: {
          name: "Aurora R",
          country_code: "ES",
        },
      },
      total_reward_count: {
        total_rewards: Math.floor(10 + Math.random() * 20),
        trader: {
          name: "Tsvetka M",
          country_code: "BG",
        },
      },
    },

    leaderboard: {
      entries: Array.from({ length: 10 }).map((_, i) => ({
        rank: i + 1,
        trader_name: FAKE_TRADERS[i],
        profit: +(base * (0.15 - i * 0.01)).toFixed(2),
        currency: "USD",
        win_ratio_percentage: +(25 + Math.random() * 40).toFixed(2),
        pair: i % 2 === 0 ? "XAUUSD" : "GBPUSD",
        average_win: +(300 + Math.random() * 1200).toFixed(2),
        average_loss: +(-50 - Math.random() * 400).toFixed(2),
        average_duration: Math.floor(2000 + Math.random() * 100000),
        trades: Math.floor(10 + Math.random() * 500),
        winning_streak: Math.floor(2 + Math.random() * 10),
        loosing_streak: Math.floor(2 + Math.random() * 30),
        profit_percentage: +(15 + Math.random() * 30).toFixed(2),
      })),
    },
  };
}




const MOCK_DATA: Record<string, any> = {
  "5000": createMockResponse(5000),
  "10000": createMockResponse(10000),
  "25000": createMockResponse(25000),
  "50000": createMockResponse(50000),
  "100000": createMockResponse(100000),
  "all": createMockResponse(null),
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accountSize = searchParams.get("account_size");

  const key = accountSize ?? "all";
  const data = MOCK_DATA[key] ?? MOCK_DATA["all"];

  return NextResponse.json(data);
}


