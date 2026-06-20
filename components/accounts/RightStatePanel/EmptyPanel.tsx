"use client";

import { useRouter } from "next/navigation";
import React from "react";

const EmptyPanel = () => {
  const router = useRouter();
  return (
    <div className=" flex items-center justify-center ml-[480px] h-screen">
      <div className="max-w-md text-center border border-white/10 rounded-2xl p-10 card-premium">
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

export default EmptyPanel;
