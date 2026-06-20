"use client";

import { useMemo } from "react";
import { BiCopy, BiTrendingUp } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";

const USER_ID = "user_123"; // replace with auth user id

const generateAffiliateCode = (userId: string) => {
  const hash = Array.from(userId)
    .reduce((acc, c) => acc + c.charCodeAt(0), 0)
    .toString(16)
    .toUpperCase();

  return hash.slice(0, 8).padEnd(8, "A");
};

const AffiliatePage = () => {
  const affiliateCode = useMemo(() => generateAffiliateCode(USER_ID), []);

  const referralLink = `https://app.epicfundedtraders.com/register?ref=${affiliateCode}`;

  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="p-8 space-y-8 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 text-xl font-semibold">
        <span className="text-[#22c55e]">EFT</span>
        Affiliate
      </div>

      {/* Referral Code Card */}
      <div className="rounded-2xl p-6 space-y-4 card-premium">
        <h2 className="font-medium">Referral Code</h2>
        <p className="text-sm text-gray-400">
          Share your referral link or code to earn commissions.
        </p>

        {/* Link */}
        <div className="flex items-center gap-2">
          <div
            onClick={() => copy(referralLink)}
            className="flex-1 bg-white/3 rounded-lg px-4 py-3 text-sm cursor-pointer"
          >
            {referralLink}
          </div>
          <button
            onClick={() => copy(referralLink)}
            className="p-2 rounded-lg bg-white/4 hover:bg-[#1f1f1f]  cursor-pointer"
          >
            <BiCopy size={16} />
          </button>
          <button
            onClick={() => copy(affiliateCode)}
            className="px-3 py-2 rounded-lg bg-white/4 hover:bg-[#1f1f1f] text-sm cursor-pointer"
          >
            {affiliateCode}
          </button>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-400/80">
          <span>
            Commissions are credited when referred users complete qualifying
            purchases.
          </span>
          <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/4 hover:bg-[#1f1f1f] text-gray-300 cursor-pointer">
            Visit Affiliate Page <FiExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button className="font-semibold px-5 py-2 rounded-md flex items-center gap-2 text-sm  hover:opacity-90 transition-opacity card-premium">
          Overview
        </button>
        <button
          className="font-semibold px-5 py-2 rounded-md flex items-center gap-2 text-sm  hover:opacity-90 transition-opacity"
          style={{ color: "var(--foreground)" }}
        >
          Daily
        </button>
      </div>

      {/* Earnings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center">
            <h2 className="font-medium mb-4">Earnings</h2>

            {/* tabs */}
            <div className="flex gap-2 mb-4">
              <button className="font-semibold px-5 py-2 rounded-md flex items-center gap-2 text-sm  hover:opacity-90 transition-opacity card-premium">
                Pickup date range
              </button>{" "}
              <button
                className="font-semibold px-5 py-2 rounded-md flex items-center gap-2 text-sm  hover:opacity-90 transition-opacity text-black"
                style={{
                  backgroundColor: "var(--primary-green)",
                }}
              >
                Cumulative
              </button>{" "}
              <button className="font-semibold px-5 py-2 rounded-md flex items-center gap-2 text-sm  hover:opacity-90 transition-opacity card-premium">
                Daily
              </button>
            </div>
          </div>
          <div
            className="rounded-2xl  h-[360px] flex flex-col justify-center items-center text-gray-400"
            style={{
              border: "1px solid var(--card-border)",
            }}
          >
            <BiTrendingUp size={28} />
            <p className="mt-2">No referral data available</p>
            <p className="text-xs opacity-70">
              Start referring users to see your earnings history
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <Stat title="Total Referrals" value="0" />
          <Stat title="Total Paid Out" value="$0.00" />
          <Stat title="Available Balance" value="$0.00" />
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 h-[150px] mt-8  flex flex-col justify-center items-center">
        No referrals found <br />
        Try adjusting the date range.
      </div>
    </div>
  );
};

export default AffiliatePage;
const Tab = ({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) => (
  <button
    className={`px-4 py-2 rounded-xl text-sm ${
      active ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
    }`}
  >
    {children}
  </button>
);

const Stat = ({ title, value }: { title: string; value: string }) => (
  <div className="rounded-xl  p-4 card-premium">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-lg font-semibold mt-1">{value}</p>
  </div>
);
