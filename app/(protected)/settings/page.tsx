"use client";

import { useState } from "react";
import {
  SettingsSidebar,
  ProfileSection,
  AccountVerificationSection,
  SecuritySection,
  DiscordSection,
  FeatureSuggestionsSection,
  PlaceholderSection,
} from "@/components/settings";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "verification":
        return <AccountVerificationSection />;
      case "security":
        return <SecuritySection />;
      case "bank-accounts":
        return (
          <PlaceholderSection
            title="Bank Accounts"
            description="Manage your bank accounts for withdrawals and deposits."
          />
        );
      case "credit-cards":
        return (
          <PlaceholderSection
            title="Credit Cards"
            description="Add and manage your credit cards for payments."
          />
        );
      case "crypto-wallets":
        return (
          <PlaceholderSection
            title="Crypto Wallets"
            description="Connect your cryptocurrency wallets for payouts."
          />
        );
      case "payment-history":
        return (
          <PlaceholderSection
            title="Payment History"
            description="View your complete payment and transaction history."
          />
        );
      case "discord":
        return <DiscordSection />;
      case "early-access":
        return (
          <PlaceholderSection
            title="Early Access"
            description="Get early access to new features and beta programs."
          />
        );
      case "feature-suggestions":
        return <FeatureSuggestionsSection />;
      case "preferences":
        return (
          <PlaceholderSection
            title="Preferences"
            description="Customize your notification and display preferences."
          />
        );
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
};

export default SettingsPage;
