"use client";

import { useMemo, useState } from "react";
import { Accounts, AccountState, AccountType, Phase } from "./AccountsTypes";
import AccountList from "./AccountList";
import ActionButtons from "./ActionButtons";

import UserHeader from "./UserHeader";
import { initialAccounts } from "./AccountsData";
import { Filters } from "./Filters";
import ActionCards from "./ActionButtons";

const AccountsSidebar = () => {
  const [accounts, setAccounts] = useState<Accounts[]>(initialAccounts);

  const [type, setType] = useState<AccountType | "All">("All");
  const [state, setState] = useState<AccountState | "All">("All");
  const [phase, setPhase] = useState<Phase | "All">("All");

  const [showArchived, setShowArchived] = useState(false);
  const [detailedView, setDetailedView] = useState(false);

  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      if (!showArchived && acc.archived) return false;
      if (type !== "All" && acc.type !== type) return false;
      if (state !== "All" && acc.state !== state) return false;
      if (phase !== "All" && acc.phase !== phase) return false;
      return true;
    });
  }, [accounts, type, state, phase, showArchived]);

  const archiveAccount = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, archived: true } : acc))
    );
  };

  return (
    <aside className="fixed top-0 w-[480px] h-screen bg-black border-r border-white/10 p-8 flex flex-col">
      {/* Static section */}
      <div className="space-y-8">
        <UserHeader />
        <ActionCards
          cards={[
            {
              type: "progress",
              title: "Next Unlock",
              subtitle: "2 / 5 Trading Days Completed",
              progress: 40,
              cta: "View Progress",
              href: "/dashboard",
            },
            {
              type: "social",
              name: "Rahul",
              country: "IN",
              message: "just passed Phase 1 ($50K)",
            },
            {
              type: "event",
              title: "Weekly Arena",
              endsIn: "2d 14h",
              subtitle: "Top 10 win rewards",
              href: "/competitions",
            },
          ]}
        />

        <Filters
          type={type}
          setType={setType}
          state={state}
          setState={setState}
          phase={phase}
          setPhase={setPhase}
          showArchived={showArchived}
          setShowArchived={setShowArchived}
          detailedView={detailedView}
          setDetailedView={setDetailedView}
          accounts={accounts}
        />
      </div>

      {/* Scrollable list */}
      <div className="mt-6 flex-1 overflow-y-auto no-scrollbar">
        <AccountList
          accounts={filteredAccounts}
          detailedView={detailedView}
          onArchive={archiveAccount}
        />
      </div>
    </aside>
  );
};

export default AccountsSidebar;
