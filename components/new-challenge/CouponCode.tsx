"use client";

import { useState } from "react";

interface CouponCodeProps {
  onApply: (code: string) => void;
}

const CouponCode = ({ onApply }: CouponCodeProps) => {
  const [code, setCode] = useState("");

  const handleApply = () => {
    if (code.trim()) {
      onApply(code.trim());
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-white font-semibold text-sm mb-1">Coupon Code</h3>
      <p className="text-white/50 text-xs mb-3">
        Enter a coupon code to get a discount on your challenge
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1  border border-[#2d3748]/70 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/60 focus:outline-none focus:border-gray-700 transition-colors"
        />
        <button
          onClick={handleApply}
          className="px-6 py-3 bg-[#1a1a1a] border border-[#2d3748]/70 rounded-xl text-white/70 text-sm font-medium hover:bg-[#222] hover:text-white transition-all duration-200"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default CouponCode;
