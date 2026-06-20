import { FiArchive, FiInbox } from "react-icons/fi";
import {
  AccountState,
  AccountType,
  FiltersProps,
  Phase,
} from "./AccountsTypes";
import { LuListCollapse } from "react-icons/lu";
import { IoCheckmarkOutline } from "react-icons/io5";

export const Filters = ({
  type,
  setType,
  state,
  setState,
  phase,
  setPhase,
  showArchived,
  setShowArchived,
  detailedView,
  setDetailedView,
}: FiltersProps) => {
  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="flex items-center gap-3 ">
        {/* Dropdowns */}
        <select
          onChange={(e) => setType(e.target.value as AccountType | "All")}
          className="filter w-full p-2 rounded-lg card-premium"
          value={type}
        >
          <option>All</option>
          <option>2 Step</option>
          <option>Competition</option>
        </select>

        <select
          onChange={(e) => setState(e.target.value as AccountState | "All")}
          className="filter w-full p-2 rounded-lg card-premium"
          value={state}
        >
          <option>All</option>
          <option>New</option>
          <option>Ongoing</option>
        </select>

        <select
          onChange={(e) => setPhase(e.target.value as Phase | "All")}
          className="filter w-full p-2 rounded-lg card-premium"
          value={phase}
        >
          <option>All</option>
          <option>Student</option>
        </select>
      </div>

      <div className="flex items-center gap-3 justify-end">
        {/* Toggles */}
        <div
          onClick={() => setShowArchived(!showArchived)}
          className={`py-1 pl-3 pr-1 rounded-full border border-white/20 flex gap-2 items-center ${
            showArchived ? "card-premium" : ""
          }`}
        >
          <button className={`toggle ${showArchived && "active"}`}>
            <FiArchive className="w-4 h-4" />
          </button>
          {showArchived ? (
            <div className="w-5 h-5 bg-gradient-to-br from-green-500/90 to-green-700/90 text-white rounded-full flex items-center justify-center">
              <IoCheckmarkOutline />
            </div>
          ) : (
            <div
              className={`w-2 h-2 mx-1.5 my-1.5 rounded-full bg-gray-100/20 hover:bg-gray-300/10`}
            />
          )}
        </div>
        <div
          onClick={() => setDetailedView(!detailedView)}
          className={`py-1 pl-3 pr-1 rounded-full border border-white/20 flex gap-2 items-center ${
            detailedView ? "" : "card-premium"
          }`}
        >
          <button className={`toggle ${detailedView && "active"}`}>
            <LuListCollapse />
          </button>
          {detailedView ? (
            <div
              className={`w-2 h-2 mx-1.5 my-1.5 rounded-full bg-gray-100/20 hover:bg-gray-300/10`}
            />
          ) : (
            <div className="w-5 h-5 bg-gradient-to-br from-green-500/90 to-green-700/90 text-white rounded-full flex items-center justify-center">
              <IoCheckmarkOutline />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
