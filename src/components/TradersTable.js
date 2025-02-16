"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Triangle from "./ui/sort-triangle/Triangle";
import Image from "next/image";
import { users } from "@/data/mock-data"; 
import Pagination from "./ui/Pagination";
import { useWallet } from "@/contexts/wallet-context"; 

export function TradesTable({ users }) {
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "descending",
  }); // Default sort by rank
  const router = useRouter();
  const { requireWallet } = useWallet(); 

  const handleRowClick = (user) => {
    requireWallet(() => {
      router.push(`/trader/${user.id}`);
    });
  };

  const handleSort = (key) => {
    requireWallet(() => {
      if (key === sortConfig.key) {
        // If clicking the same column again, reset to default (sort by rank)
        setSortConfig({ key: "rank", direction: "ascending" });
      } else {
        // Otherwise, sort by the clicked column
        setSortConfig({ key, direction: "descending" });
      }
    });
  };

  const sortedUsers = Array.isArray(users)
    ? [...users].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "descending" ? 1 : -1;
        return 0;
      })
    : [];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // default items per page is 5

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = [
    { text: "Rank", key: "rank" },
    { text: "Trader", key: "xHandle" },
    { text: "Followers", key: "followers" },
    { text: "Tokens", key: "tokens" },
    { text: "Win Rate", key: "winRate" },
    { text: "Trades", key: "totalTrades" },
    { text: "Avg Buy", key: "avgBuyPrice" },
    { text: "Avg Entry", key: "avgEntry" },
    { text: "Avg Hold", key: "avgHold" },
    { text: "Realized PNL", key: "realizedPNL" },
    { text: "Share", key: "share" },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const truncateWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const formatNumber = (value, isCurrency = false) => {
    if (value >= 1e9)
      return isCurrency ? `$${(value / 1e9).toFixed(0)}B` : `${(
        value / 1e9
      ).toFixed(1)}B`;
    if (value >= 1e6)
      return isCurrency ? `$${(value / 1e6).toFixed(0)}M` : `${(
        value / 1e6
      ).toFixed(1)}M`;
    if (value >= 1e3)
      return isCurrency ? `$${(value / 1e3).toFixed(0)}K` : `${(
        value / 1e3
      ).toFixed(1)}K`;
    return isCurrency ? `$${value.toFixed(2)}` : value.toString();
  };

  const formatFollowers = (followers) => {
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}k`;
    }
    return followers.toString();
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-[#CCAD59] text-black rounded-full w-8 h-8 flex items-center justify-center";
      case 2:
        return "bg-[#BFBFBF] text-black rounded-full w-8 h-8 flex items-center justify-center";
      case 3:
        return "bg-[#B2835F] text-black rounded-full w-8 h-8 flex items-center justify-center";
      default:
        return "text-center px-3";
    }
  };

  const handleShareClick = (user) => {
    requireWallet(() => {
      console.log("Share clicked for user:", user);
    });
  };

  const formatAvgHold = (minutes) => {
    if (minutes < 240) {
      return `${minutes} min`;
    }
    const hours = (minutes / 60).toFixed(1);
    return `${hours} hr`;
  };

  return (
    <div className="relative">
      <div className="rounded-lg bg-[#1A1721]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#25223D]">
              <tr className="text-gray-400 text-sm">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={`px-2 lg:px-4 2xl:px-6 lg:py-4 py-2 font-medium cursor-pointer ${
                      header.key === "rank" || header.key === "xHandle"
                        ? "text-left"
                        : "text-right"
                    }`}
                    onClick={() =>
                      header.key !== "rank" &&
                      header.key !== "xHandle" &&
                      header.key !== "share" &&
                      handleSort(header.key)
                    }
                  >
                    <div
                      className={`flex items-center ${
                        header.key === "rank" || header.key === "xHandle"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <span className="mr-2 text-white lg:font-bold">
                        {header.text}
                      </span>
                      {header.key !== "rank" &&
                        header.key !== "xHandle" &&
                        header.key !== "share" && (
                          <Triangle isUp={sortConfig.key === header.key} />
                        )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-[#23242C]">
              {currentItems.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#2D2A34] transition-colors cursor-pointer"
                  onClick={() => handleRowClick(user)}
                >
                  {/* Rank */}
                  <td className="px-6 py-4 font-medium text-start">
                    <span className={getRankStyle(user.rank)}>{user.rank}</span>
                  </td>

                  {/* Trader */}
                  <td className="px-6 py-4 text-left min-w-56">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.profilePicture}
                        alt={user.xHandle}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{user.xHandle}</div>
                        <div className="text-gray-400 text-sm">
                          {truncateWalletAddress(user.walletAddress)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Followers */}
                  <td className="px-6 py-4 text-right">
                    <div>{formatFollowers(user.followers) || "N/A"}</div>
                    <div className="text-gray-400 text-sm">
                      @{user.socialsUsername}
                    </div>
                  </td>

                  {/* Tokens */}
                  <td className="px-6 py-4 text-right">
                    <span>{user.tokens.length}</span>
                  </td>

                  {/* Win Rate */}
                  <td className="px-6 py-4 text-right text-[#59CC6C]">
                    {user.winRate || "0%"}
                  </td>

                  {/* Trades */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-[#59CC6C]">
                      {user.successfulTrades || 0}
                    </span>
                    <span className="text-[#858585] lg:mx-1">/</span>
                    <span className="text-[#CC5959]">{user.totalTrades}</span>
                  </td>

                  {/* Avg Buy */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="font-medium">
                        {user.avgBuy.sol.toFixed(2) || "0.00"}
                      </span>
                      <img
                        src="/images/solana.png"
                        alt="SOL"
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="text-gray-400 text-sm">
                      {formatCurrency(user.avgBuy.usd)}
                    </div>
                  </td>

                  {/* Avg Entry */}
                  <td className="px-6 py-4 text-right">
                    {formatNumber(user.avgEntry, true) || "N/A"}
                  </td>

                  {/* Avg Hold */}
                  <td className="px-6 py-4 text-right">
                    {formatAvgHold(user.avgHold)}
                  </td>

                  {/* Realized PNL */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span
                        style={{
                          color:
                            user.realizedPNL.usd >= 0 ? "#59CC6C" : "#CC5959",
                        }}
                        className="font-medium"
                      >
                        {user.realizedPNL.usd >= 0
                          ? `+${user.realizedPNL.sol.toFixed(2)}`
                          : user.realizedPNL.sol.toFixed(2)}
                      </span>
                      <img
                        src="/images/solana.png"
                        alt="SOL"
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="text-gray-400 text-sm">
                      {formatCurrency(user.realizedPNL.usd)}
                    </div>
                  </td>

                  {/* Share */}
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-[#AA00FF] hover:text-[#c93cff]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareClick(user);
                      }}
                    >
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
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={sortedUsers.length}
        paginate={paginate}
      />
    </div>
  );
}