"use client";

import { useState } from "react";
import { TradesTable } from "@/components/TradersTable";
import { users as initialUsers } from "@/data/mock-data";
import SearchAndFilter from "@/components/ui/SearchAndFilter";
import TabButton from "@/components/ui/TabButton";
import { useWallet } from "@/contexts/wallet-context";

export function NavTabs() {
  const [activeTab, setActiveTab] = useState("traders");
  const [activeTimeframe, setActiveTimeframe] = useState("daily");
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "ascending",
  });

  const { requireWallet } = useWallet();

  const handleSort = (key) => {
    requireWallet(() => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    });
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    return aValue < bValue
      ? sortConfig.direction === "ascending"
        ? -1
        : 1
      : sortConfig.direction === "ascending"
      ? 1
      : -1;
  });

  const handleFilterUsers = (users) => {
    requireWallet(() => {
      setFilteredUsers(users);
    });
  };

  return (
    <div className="flex flex-col space-y-6 mx-auto max-sm:px-4 max-md:px-6 max-lg:px-10 lg:px-12 ">
      <div className="flex items-center max-lg:justify-center justify-between flex-wrap-reverse gap-y-4">
        <div className="flex gap-y-2 max-lg:justify-center items-center md:gap-20 flex-wrap-reverse">
          <div className="flex items-center space-x-2">
            <TabButton
              label="Traders"
              isActive={activeTab === "traders"}
              onClick={() => setActiveTab("traders")}
            />
            <TabButton
              label="Groups"
              isActive={activeTab === "groups"}
              onClick={() => setActiveTab("groups")}
            />
          </div>
          <div className="flex items-center space-x-2">
            {["Daily", "Weekly", "Monthly", "All-Time"].map((timeframe) => (
              <TabButton
                key={timeframe}
                label={timeframe}
                isActive={activeTimeframe === timeframe.toLowerCase()}
                onClick={() => setActiveTimeframe(timeframe.toLowerCase())}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center max-lg:text-end space-x-4">
          <SearchAndFilter
            initialData={initialUsers}
            onFilter={handleFilterUsers}
            searchKeys={["xHandle", "walletAddress"]}
            placeholder="Search by name or wallet"
          />
        </div>
      </div>

      {activeTab === "traders" ? (
        <TradesTable users={sortedUsers} onSort={handleSort} />
      ) : (
        <div className="flex items-center justify-center h-[400px] text-gray-400">
          Coming Soon
        </div>
      )}
    </div>
  );
}