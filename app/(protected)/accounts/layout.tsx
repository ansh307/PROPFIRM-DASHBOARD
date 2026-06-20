import AccountsSidebar from "@/components/accounts/AccountsSidebar";
import React from "react";

const AccountsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AccountsSidebar />
      {children}
    </div>
  );
};

export default AccountsLayout;
