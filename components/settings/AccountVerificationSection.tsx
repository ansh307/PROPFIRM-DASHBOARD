"use client";

import { FiCircle, FiCheckCircle } from "react-icons/fi";

const AccountVerificationSection = () => {
  const isVerified = false;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">
        Account Verification
      </h1>

      <div className=" border  rounded-xl p-6 card-premium">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {isVerified ? (
              <FiCheckCircle className="text-green-500 mt-1" size={20} />
            ) : (
              <FiCircle className="text-gray-500 mt-1" size={20} />
            )}
            <div>
              <h3 className="text-white font-semibold text-base">
                Identity Verification Available
              </h3>
              <p className="text-white/50 text-sm mt-1">
                You can now verify your identity
              </p>
            </div>
          </div>
          <span
            className={`text-sm px-3 py-1 rounded ${
              isVerified ? "bg-green-500/20 text-green-400" : "text-white/60"
            }`}
          >
            {isVerified ? "Verified" : "Not Verified"}
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center text-center py-8">
          <h4 className="text-white font-semibold text-lg mb-2">
            Start Verification
          </h4>
          <p className="text-white/50 text-sm mb-6">
            Verify your identity to unlock additional features
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
            Start Verification
          </button>
          <p className="text-white/50 text-xs mt-4 flex items-center gap-1">
            <span>✓</span> Powered by KYCAID
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationSection;
