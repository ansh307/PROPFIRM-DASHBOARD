"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiPlus,
  FiBriefcase,
  FiDollarSign,
  FiList,
  FiCalendar,
  FiSettings,
} from "react-icons/fi";
import { RiDashboardFill, RiLogoutBoxLine } from "react-icons/ri";
import { FaTrophy, FaCertificate } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { useClerk } from "@clerk/nextjs";
import { TfiDashboard } from "react-icons/tfi";

const Sidebar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
  };

  const menuItems = [
    { icon: FiBriefcase, label: "Accounts", href: "/accounts" },
    // { icon: FiDollarSign, label: "Payouts", href: "/payouts" },
    { icon: FaTrophy, label: "Competitions", href: "/competitions" },
    { icon: FiList, label: "Leaderboard", href: "/leaderboard" },
    { icon: FaCertificate, label: "Certificates", href: "/certificates" },
    {
      icon: FiCalendar,
      label: "Economic Calendar",
      href: "/economic-calendar",
    },
    { icon: HiUsers, label: "Affiliate", href: "/affiliate" },
  ];

  return (
    <div
      className="fixed left-0 top-0 h-screen w-18 flex flex-col items-center py-3 z-50 transition-all duration-300 border-r border-gray-800/50 backdrop-blur-xl overflow-hidden"
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="mb-4 group flex-shrink-0">
        <div className="w-12 h-12 flex items-center justify-center cursor-pointer rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 hover:bg-gradient-to-br hover:from-green-500/10 hover:to-blue-500/10">
          <RiDashboardFill
            size={26}
            className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
          />
        </div>
      </Link>

      {/* Plus Icon - New Challenge */}
      <div className="mb-2 w-full px-3 flex-shrink-0">
        <Link
          href="/new-challenge"
          className="relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 active:scale-95"
          title="New Challenge"
        >
          <FiPlus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          <span className="absolute left-full ml-4 px-3 py-2 text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none whitespace-nowrap transition-all duration-200 z-50 shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-gray-700/50 backdrop-blur-sm">
            New Challenge
            <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></span>
          </span>
        </Link>
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-2 flex-shrink-0"></div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col items-center gap-1.5 w-full px-3 overflow-y-auto overflow-x-hidden min-h-0">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative group w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                  : "text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#1a1a1a]/80 hover:to-[#1a1a1a] hover:scale-105 hover:shadow-md active:scale-95"
              }`}
              title={item.label}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon
                className={`w-5 h-5 transition-all duration-300 ${
                  isActive
                    ? "drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                    : "group-hover:scale-110"
                }`}
              />
              {isActive && (
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full shadow-lg shadow-white/50"></span>
              )}
              <span className="absolute left-full ml-4 px-3 py-2 text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none whitespace-nowrap transition-all duration-200 delay-100 z-50 shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-gray-700/50 backdrop-blur-sm">
                {item.label}
                <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></span>
              </span>
            </Link>
          );
        })}
      </nav>
      {/* ne */}
      {/* Divider */}
      <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2 flex-shrink-0"></div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-1.5 px-3 flex-shrink-0">
        {/* Settings */}
        <Link
          href="/settings"
          className={`relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
            pathname === "/settings"
              ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
              : "text-gray-400 hover:text-white  hover:bg-gradient-to-br hover:from-[#1a1a1a]/80 hover:to-[#1a1a1a] hover:scale-105 hover:shadow-md active:scale-95"
          }`}
          title="Settings"
        >
          <FiSettings
            className={`w-5 h-5 transition-all duration-300 ${
              pathname === "/settings"
                ? "rotate-90 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                : "group-hover:rotate-90 group-hover:scale-110"
            }`}
          />
          <span className="absolute left-full ml-4 px-3 py-2 text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none whitespace-nowrap transition-all duration-200 delay-100 z-50 shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-gray-700/50 backdrop-blur-sm">
            Settings
            <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></span>
          </span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-red-600/20 hover:to-red-700/20 hover:scale-105 hover:shadow-md hover:shadow-red-500/20 active:scale-95"
          title="Logout"
        >
          <RiLogoutBoxLine className="w-5 h-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:scale-110" />
          <span className="absolute left-full ml-4 px-3 py-2 text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none whitespace-nowrap transition-all duration-200 delay-100 z-50 shadow-xl bg-gradient-to-r from-red-900 to-red-800 text-white border border-red-700/50 backdrop-blur-sm">
            Logout
            <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-red-900"></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
