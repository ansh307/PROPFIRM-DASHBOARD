export type AccountType = "Zero Step" | "1 Step" | "2 Step" | "Competition";
export type AccountState = "New" | "Ongoing";
export type Phase = "Student" | "Practitioner" | "Master";

export interface Accounts {
 id: string;
  type: AccountType;
  state: AccountState;
  phase: Phase;
  balance: number;
  profitPct: number;
  archived: boolean;
}


export interface FiltersProps {
  accounts: Accounts[];
  type: AccountType | "All";
  setType: (v: AccountType | "All") => void;
  state: AccountState | "All";
  setState: (v: AccountState | "All") => void;
  phase: Phase | "All";
  setPhase: (v: Phase | "All") => void;
    showArchived: boolean;
  setShowArchived: (v: boolean) => void;
  detailedView: boolean;
  setDetailedView: (v: boolean) => void;
}