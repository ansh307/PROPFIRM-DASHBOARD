"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiPlus,
  FiGift,
  FiBriefcase,
  FiDollarSign,
  FiList,
  FiCalendar,
  FiSettings,
} from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaTrophy, FaCertificate } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { useClerk } from "@clerk/nextjs";

const Sidebar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
  };

  const menuItems = [
    { icon: FiGift, label: "Raffle", href: "/raffle" },
    { icon: FiBriefcase, label: "Accounts", href: "/accounts" },
    { icon: FiDollarSign, label: "Payouts", href: "/payouts" },
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
      className="fixed left-0 top-0 h-screen w-18 flex flex-col items-center py-4 z-50"
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-white font-bold text-xl">G</span>
        </div>
      </Link>

      {/* Plus Icon - New Challenge */}
      <div className="mb-3 w-full px-4">
        <Link
          href="/new-challenge"
          className="relative group w-11 h-11 flex items-center justify-center rounded-xl transition-all bg-green-500 text-white hover:bg-green-600"
          title="New Challenge"
        >
          <FiPlus className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2.5 py-1.5 text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg bg-[var(--hover-bg)] text-[var(--foreground)]">
            New Challenge
          </span>
        </Link>
      </div>

      {/* Other Menu Items */}
      <nav className="flex-1 flex flex-col items-center gap-3 w-full px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative group w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
                isActive
                  ? "bg-green-500 text-white"
                  : "text-[var(--secondary-gray)] hover:bg-[var(--hover-bg)] hover:text-white"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="absolute left-full ml-3 px-2.5 py-1.5 text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg bg-[var(--hover-bg)] text-[var(--foreground)]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3 px-4">
        {/* Settings */}
        <Link
          href="/settings"
          className={`relative group w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
            pathname === "/settings"
              ? "bg-blue-500 text-white"
              : "text-[var(--secondary-gray)] hover:bg-[var(--hover-bg)] hover:text-white"
          }`}
          title="Settings"
        >
          <FiSettings className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2.5 py-1.5 text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg bg-[var(--hover-bg)] text-[var(--foreground)]">
            Settings
          </span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="relative group w-11 h-11 flex items-center justify-center rounded-xl transition-all text-[var(--secondary-gray)] hover:bg-[var(--hover-bg)] hover:text-white"
          title="Logout"
        >
          <RiLogoutBoxLine className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2.5 py-1.5 text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg bg-[var(--hover-bg)] text-[var(--foreground)]">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
