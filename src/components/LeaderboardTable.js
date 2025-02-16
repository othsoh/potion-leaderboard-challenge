"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchAndFilter from "@/components/ui/SearchAndFilter";
import TabButton from "@/components/ui/TabButton";
import Triangle from "./ui/sort-triangle/Triangle";
import Pagination from "@/components/ui/Pagination";
import "@/styles/custom-scrollbar.css";

const tabs = [
  { id: "trades", label: "Trades" },
  { id: "tokens", label: "Tokens" },
  { id: "groups", label: "Groups" },
];

export default function LeaderboardTable({ trades: initialTrades = [] }) {
  const [filteredData, setFilteredData] = useState(initialTrades);
  const [activeTab, setActiveTab] = useState("trades");
  const [sortConfig, setSortConfig] = useState({
    key: "token",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // default items per page is 5

  const handleSort = (key) => {
    if (key === sortConfig.key) {
      setSortConfig({ key: "token", direction: "ascending" });
    } else {
      setSortConfig({ key, direction: "ascending" });
    }
  };

  const sortedData = Array.isArray(filteredData)
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  const truncateWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center flex-wrap gap-y-4 max-md:justify-center justify-between">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
        <div className="max-md:w-full max-md:flex max-md:justify-end">
          <SearchAndFilter
            initialData={initialTrades}
            onFilter={setFilteredData}
            searchKeys={["token.name", "token.address"]}
            placeholder="Search by token name or address"
          />
        </div>
      </div>

      {activeTab === "trades" ? (
        <div className="rounded-lg bg-[#1A1721]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#25223D]">
                <tr className="text-gray-400 text-sm">
                  {[
                    { text: "Token", key: "token" },
                    { text: "Last Trade", key: "lastTrade" },
                    { text: "MC", key: "mc" },
                    { text: "Invested", key: "invested" },
                    { text: "Realized PNL", key: "realizedPNL" },
                    { text: "ROI", key: "roi" },
                    { text: "Trades", key: "trades" },
                    { text: "Holding", key: "holding" },
                    { text: "Avg Buy", key: "avgBuy" },
                    { text: "Avg Sell", key: "avgSell" },
                    { text: "Held", key: "held" },
                    { text: "Share", key: "share" },
                  ].map((header, index) => (
                    <th
                      key={index}
                      className={`px-4 lg:px-4 2xl:lg:px-6 max-md: lg:py-4 py-2 font-medium cursor-pointer ${
                        header.key === "token" || header.key === "lastTrade"
                          ? "text-left"
                          : "text-right"
                      }`}
                      onClick={() =>
                        header.key !== "token" &&
                        header.key !== "lastTrade" &&
                        header.key !== "share" &&
                        handleSort(header.key)
                      }
                    >
                      <div
                        className={`flex items-center ${
                          header.key === "token" || header.key === "lastTrade"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <span className="mr-2 text-white lg:font-bold">
                          {header.text}
                        </span>
                        {header.key !== "token" &&
                          header.key !== "lastTrade" &&
                          header.key !== "share" && (
                            <Triangle isUp={sortConfig.key === header.key} />
                          )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-[#23242C]">
                {currentItems.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#2D2A34] transition-colors text-end cursor-pointer"
                    onClick={() => console.log(row)}
                  >
                    <td className="lg:px-6 max-md: px-4 py-4 text-left min-w-56">
                      <div className="flex items-center gap-2">
                        <Image
                          src={row.token?.image || "/placeholder.svg"}
                          alt={row.token?.name || "Token"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium">
                            {row.token?.name || "Unknown Token"}
                          </p>
                          <p className="text-sm text-gray-400">
                            {truncateWalletAddress(row.token?.address || "")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="lg:px-6 max-md: px-4 py-4 text-gray-400">
                      {row.lastTrade}
                    </td>
                    <td className="lg:px-6 max-md: px-4 py-4">
                      {formatNumber(row.mc)}
                    </td>
                    <td className="lg:px-6 max-md: px-4 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <span className="font-medium">
                          {row.invested.sol || "0"}
                        </span>
                        <Image
                          src="/images/solana.png"
                          alt="SOL"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="text-gray-400 text-sm">
                        {formatCurrency(row.invested.usd)}
                      </div>
                    </td>
                    <td className="lg:px-6 max-md: px-4  py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <span
                          style={{
                            color:
                              row.realizedPNL.sol >= 0 ? "#59CC6C" : "#CC5959",
                          }}
                          className="font-medium"
                        >
                          {row.realizedPNL.sol >= 0
                            ? `+${row.realizedPNL.sol}`
                            : row.realizedPNL.sol}
                        </span>
                        <Image
                          src="/images/solana.png"
                          alt="SOL"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="text-gray-400 text-sm">
                        {formatCurrency(row.realizedPNL.usd)}
                      </div>
                    </td>
                    <td
                      className={`lg:px-6 max-md: px-4 py-4 ${
                        parseFloat(row.roi) > 50
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {row.roi}
                    </td>
                    <td className="lg:px-6 max-md: px-4 py-4 text-right">
                      <span className="text-[#59CC6C]">
                        {row.trades.successfulTrades || 0}
                      </span>
                      <span className="text-[#858585] lg:mx-1">/</span>
                      <span className="text-[#CC5959]">{row.trades.total}</span>
                    </td>
                    <td className="lg:px-6 max-md: px-4 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <span className="font-medium">
                          {row.holding.sol || "0"}
                        </span>
                        <Image
                          src="/images/solana.png"
                          alt="SOL"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="text-gray-400 text-sm">
                        {formatCurrency(row.holding.usd)}
                      </div>
                    </td>
                    <td className="lg:px-6 max-md: px-4 py-4">
                      {formatNumber(row.avgBuy.usd)}
                    </td>
                    <td className="lg:px-6 max-md: px-4 py-4">
                      {formatNumber(row.avgSell)}
                    </td>
                    <td className="lg:px-6 max-md: px-4 py-4">{row.held}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-[#AA00FF] hover:text-[#c93cff]">
                        <Image
                          src="/images/share-icon.svg"
                          alt="share-icon"
                          width={5}
                          height={5}
                          className="w-6 h-6"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-400">
          Coming Soon
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={sortedData.length}
        paginate={paginate}
      />
    </div>
  );
}
