"use client";

import { useState } from "react";
import { FaDiscord } from "react-icons/fa";

const DiscordSection = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectDiscord = () => {
    // Handle Discord OAuth connection
    console.log("Connecting to Discord...");
    setIsConnected(!isConnected);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Connect to Discord</h1>

      <div className=" border rounded-xl p-6 card-premium">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#5865F2] rounded-full flex items-center justify-center">
              <FaDiscord className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">
                {isConnected ? "Discord Connected" : "Discord Not Connected"}
              </h3>
              <p className="text-white/50 text-sm mt-1">
                {isConnected
                  ? "Your Discord account is connected. You will receive trade alerts and community updates."
                  : "Connect your Discord account to receive trade alerts and community updates"}
              </p>
            </div>
          </div>
          <button
            onClick={handleConnectDiscord}
            className={`font-medium px-6 py-2.5 rounded-lg transition-colors text-sm ${
              isConnected
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isConnected ? "Disconnect Discord" : "Connect Discord"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscordSection;
