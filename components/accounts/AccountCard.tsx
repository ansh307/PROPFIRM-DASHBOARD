"use client";

import { useEffect, useRef, useState } from "react";
import { Accounts } from "./AccountsTypes";
import { GiGraduateCap, GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaCrown, FaUserTie } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface AccountCardProps {
  account: Accounts;
  detailedView: boolean;
  onArchive: (id: string) => void;
}

interface CompressedAccountCardProps {
  account: Accounts;
  onArchive: (id: string) => void;
}

interface DetailedAccountCardProps {
  account: Accounts;
  onArchive: (id: string) => void;
}

interface CardMenuProps {
  onArchive: (id: string) => void;
  accountId: string;
  accountState: string;
}

export const AccountCard = ({
  account,
  detailedView,
  onArchive,
}: AccountCardProps) => {
  return detailedView ? (
    <DetailedAccountCard account={account} onArchive={onArchive} />
  ) : (
    <CompressedAccountCard account={account} onArchive={onArchive} />
  );
};

const CompressedAccountCard = ({
  account,
  onArchive,
}: CompressedAccountCardProps) => {
  const AccountIcon = ({ account }: { account: Accounts }) => {
    if (account.type === "Competition") {
      return (
        <GiPerspectiveDiceSixFacesRandom className="h-6 w-6 text-orange-500" />
      );
    }

    if (account.phase === "Student") {
      return <GiGraduateCap className="h-6 w-6  text-blue-500" />;
    }

    if (account.phase === "Practitioner") {
      return <FaUserTie className="h-6 w-6  text-indigo-600" />;
    }

    if (account.phase === "Master") {
      return <FaCrown className="h-6 w-6  text-purple-700" />;
    }

    return null;
  };

  const router = useRouter();

  return (
    <div
      className="card compact border border-white/20 p-3 rounded-xl cursor-pointer"
      onClick={() => router.push(`/accounts/${account.id}`)}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <AccountIcon account={account} />

          <div>
            <p className="font-semibold">
              {account.id}{" "}
              <span className="text-xs font-light text-gray-200/60 ml-2">
                Ph1
              </span>
            </p>
            <p className="text-gray-200/60 text-xs ">
              <span>${account.balance.toLocaleString()}</span>
              <span className="mx-1"> •</span>
              <span className="text-green-400 ml-1">+{account.profitPct}%</span>
            </p>
          </div>
        </div>

        <CardMenu
          onArchive={onArchive}
          accountId={account.id}
          accountState={account.state}
        />
      </div>
    </div>
  );
};

const DetailedAccountCard = ({
  account,
  onArchive,
}: DetailedAccountCardProps) => {
  const AccountIcon = ({ account }: { account: Accounts }) => {
    if (account.type === "Competition") {
      return (
        <GiPerspectiveDiceSixFacesRandom className="h-6 w-6 text-orange-500" />
      );
    }

    if (account.phase === "Student") {
      return <GiGraduateCap className="h-6 w-6  text-blue-500" />;
    }

    if (account.phase === "Practitioner") {
      return <FaUserTie className="h-6 w-6  text-indigo-600" />;
    }

    if (account.phase === "Master") {
      return <FaCrown className="h-6 w-6  text-purple-700" />;
    }

    return null;
  };
  const router = useRouter();
  return (
    <div
      className="card border border-white/20 p-4 rounded-xl flex-col flex gap-6 cursor-pointer"
      onClick={() => router.push(`/accounts/${account.id}`)}
    >
      <div className="flex justify-between ">
        <div className="flex flex-col gap-1 ">
          <div className="flex gap-2">
            <AccountIcon account={account} />
            <span className="font-semibold">{account.id}</span>
          </div>
          <p className="text-gray-200/60 text-xs ">
            <span>${account.balance.toLocaleString()}</span>
            <span className="mx-2"> •</span>
            <span className="">{account.type}</span>
            <span className="mx-2"> •</span>

            <span className="">{account.phase}</span>
          </p>
        </div>
        <CardMenu
          onArchive={onArchive}
          accountId={account.id}
          accountState={account.state}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3 text-sm">
          <div>
            <p className="label text-xs text-gray-200/60">Balance</p>
            <p className="value">${account.balance.toLocaleString()}</p>
          </div>
          <div>
            <p className="label text-xs text-gray-200/60">P&L</p>
            <p className="text-green-500">
              +${((account.balance * account.profitPct) / 100).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <p className="label text-xs text-gray-200/60">Account Type</p>
            <p className="value">{account.type}</p>
          </div>
          <div>
            <p className="label text-xs text-gray-200/60">profit%</p>
            <p className="green">{account.profitPct}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardMenu = ({ onArchive, accountId, accountState }: CardMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs border border-green-600/50 text-green-200/90 px-2 py-1 rounded-full">
        {accountState}
      </div>
      <div ref={menuRef} className="relative">
        <button className="p-2" onClick={() => setOpen((prev) => !prev)}>
          ⋮
        </button>

        {open && (
          <div className="absolute right-0 bg-[#111827] border border-white/10 rounded-lg">
            <button
              onClick={() => {
                onArchive(accountId);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm hover:bg-red-500/10 text-red-400 w-full text-left"
            >
              Archive
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
