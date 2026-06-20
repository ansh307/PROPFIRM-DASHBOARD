"use client";

import {
  FiUser,
  FiShield,
  FiLock,
  FiCreditCard,
  FiFileText,
  FiMessageCircle,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import { BsBank, BsWallet2 } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "profile", label: "Profile", icon: FiUser },
  { id: "verification", label: "Account Verification", icon: FiShield },
  { id: "security", label: "Security", icon: FiLock },
  { id: "bank-accounts", label: "Bank Accounts", icon: BsBank },
  { id: "credit-cards", label: "Credit Cards", icon: FiCreditCard },
  { id: "crypto-wallets", label: "Crypto Wallets", icon: BsWallet2 },
  { id: "payment-history", label: "Payment History", icon: FiFileText },
  { id: "discord", label: "Discord", icon: FiMessageCircle },
  { id: "early-access", label: "Early Access", icon: FiStar },
  {
    id: "feature-suggestions",
    label: "Feature Suggestions",
    icon: HiOutlineLightBulb,
  },
  { id: "preferences", label: "Preferences", icon: FiSettings },
];

const SettingsSidebar = ({ activeTab, onTabChange }: SettingsSidebarProps) => {
  return (
    <div
      className="w-[480px] p-8 border-r "
      style={{
        borderRightColor: "var(--card-border)",
      }}
    >
      <h2 className="text-white text-xl font-semibold mb-6">Configuration</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors text-left ${
                isActive
                  ? "card-premium text-green-400"
                  : "text-gray-400 card-premium-without-border hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsSidebar;
