"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SecuritySection = () => {
  const [currentPassword, setCurrentPassword] = useState("passwordexample");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleChangePassword = () => {
    // Handle password change logic
    console.log("Changing password...");
  };

  const handleEnable2FA = () => {
    // Handle 2FA enable logic
    setIs2FAEnabled(!is2FAEnabled);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Security</h1>

      {/* Change Password */}
      <div className=" border  rounded-xl p-6 card-premium">
        <h3 className="text-white font-semibold text-base mb-6">
          Change Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white/50 text-sm mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border  rounded-lg px-4 py-3 text-white text-sm  pr-10 card-premium-border"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showCurrentPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white/50 text-sm mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full  border  rounded-lg px-4 py-3 text-white text-sm  pr-10 card-premium-border"
                placeholder="New Password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white/50 text-sm mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full  border rounded-lg px-4 py-3 text-white text-sm  pr-10 card-premium-border"
                placeholder="Confirm New Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleChangePassword}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className=" border  rounded-xl p-6 card-premium">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-white font-semibold text-base">
            Two-Factor Authentication
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded ${
              is2FAEnabled
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {is2FAEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        <div className="card-premium-border rounded-lg p-4 flex items-center justify-between">
          <div className="text-white/50 text-sm">
            {is2FAEnabled
              ? "Two-factor authentication is currently enabled for your account."
              : "Add an extra layer of security to your account by enabling two-factor authentication."}
          </div>
          <button
            onClick={handleEnable2FA}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
