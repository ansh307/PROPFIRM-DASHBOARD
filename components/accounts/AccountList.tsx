import { AccountCard } from "./AccountCard";
import { Accounts } from "./AccountsTypes";

const AccountList = ({
  accounts,
  detailedView,
  onArchive,
}: {
  accounts: Accounts[];
  detailedView: boolean;
  onArchive: (id: string) => void;
}) => {
  return (
    <div className="space-y-4">
      {accounts.map((acc) => (
        <AccountCard
          key={acc.id}
          account={acc}
          detailedView={detailedView}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
};

export default AccountList;
