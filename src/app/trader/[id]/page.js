"use client";

import { useEffect, useState, useMemo } from "react";
import { use } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { HeaderAlerts } from "@/components/ui/HeaderAlert";
import { trades, users } from "@/data/mock-data";
import UserProfile from "@/components/UserProfile";
import TimeframeSelector from "@/components/TimeframeSelector";
import StatsOverview from "@/components/StatsOverview";
import LeaderboardTable from "@/components/LeaderboardTable";
import Image from "next/image";
import { WalletProvider, useWallet } from "@/contexts/wallet-context"; 
import PerformanceGraph from "@/components/PerformanceGraph";

export default function TraderProfile({ params }) {
  const { isConnected, isLoading } = useWallet();
  const [trader, setTrader] = useState(null);
  const [traderTrades, setTraderTrades] = useState([]);
  const [timeframe, setTimeframe] = useState("Daily");
  const resolvedParams = use(params);

  useEffect(() => {
    const userId = parseInt(resolvedParams.id);
    const selectedUser = users.find((user) => user.id === userId);

    if (selectedUser) {
      setTrader(selectedUser);
      const filteredTrades = trades.filter((trade) => trade.userId === userId);
      setTraderTrades(filteredTrades);
    }
  }, [resolvedParams.id]);

  // Prepare data for the graph
  const performanceData = traderTrades.map(
    (trade) => ({
      id: trade.id,
      pnl: trade.realizedPNL.usd,
      token: trade.token.name,
    })  );
  const calculatedStats = useMemo(() => {
    if (!trader || traderTrades.length === 0) {
      return {
        tokens: { value: "0" },
        winRate: { value: "0%" },
        trades: { successfulTrades: "0", total: "/ 0" },
        averageBuy: { sol: "0", usd: "$0" }, 
        averageEntry: { value: "$0" },
        averageHold: { value: "0 min" },
        totalInvested: { sol: "0", usd: "$0" }, 
        roi: { value: "0%" },
        realizedPnl: { sol: "0", usd: "$0" }, 
      };
    }

    const tokensCount = trader.tokens.length;

    const totalHoldingSOL = traderTrades.reduce(
      (sum, trade) => sum + (trade.holding?.sol || 0),
      0
    );
    const totalHoldingUSD = traderTrades.reduce(
      (sum, trade) => sum + (trade.holding?.usd || 0),
      0
    );

    const successfulTradesCount = traderTrades.filter(
      (trade) => (trade.realizedPNL?.usd || 0) > 0
    ).length;
    const totalTradesCount = traderTrades.length;
    const winRate =
      totalTradesCount === 0
        ? "0%"
        : `${Math.round((successfulTradesCount / totalTradesCount) * 100)}%`;

    const totalInvestedSOL = traderTrades.reduce(
      (sum, trade) => sum + (trade.invested?.sol || 0),
      0
    );
    const totalInvestedUSD = traderTrades.reduce(
      (sum, trade) => sum + (trade.invested?.usd || 0),
      0
    );

    const totalRealizedPNLSOL = traderTrades.reduce(
      (sum, trade) => sum + (trade.realizedPNL?.sol || 0),
      0
    );
    const totalRealizedPNLUSD = traderTrades.reduce(
      (sum, trade) => sum + (trade.realizedPNL?.usd || 0),
      0
    );

    const roiUSD =
      totalInvestedUSD !== 0
        ? (totalRealizedPNLUSD / totalInvestedUSD) * 100
        : 0;
    const roiFormatted = `+${roiUSD.toFixed(0)}%`;

    const formatNumber = (value) => {
      if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
      if (value >= 1e3) return `$${(value / 1e3).toFixed(0)}K`;
      return `$${Math.abs(value).toFixed(0)}`;
    };
    const formatCurrency = (value) => {
      return `$${Math.abs(value).toLocaleString()}`;
    };
    const validTrades = traderTrades.filter(
      (trade) => trade.avgBuy?.sol && trade.avgBuy?.usd
    );
    const avgBuySOL =
      validTrades.length > 0
        ? validTrades.reduce((sum, trade) => sum + trade.avgBuy.sol, 0) /
          validTrades.length
        : 0;
    const avgBuyUSD =
      validTrades.length > 0
        ? validTrades.reduce((sum, trade) => sum + trade.avgBuy.usd, 0) /
          validTrades.length
        : 0;
    const totalHeldMinutes = traderTrades.reduce((sum, trade) => {
      const heldTime = parseFloat((trade.held || "").replace(/[^0-9.]/g, ""));
      return sum + (isNaN(heldTime) ? 0 : heldTime);
    }, 0);
    const averageHoldFormatted = `${
      traderTrades.length > 0
        ? (totalHeldMinutes / traderTrades.length).toFixed(0)
        : 0
    } min`;

    const realizedPNLSignUSD = totalRealizedPNLUSD >= 0 ? "+" : "-";
    const realizedPNLSignSOL = totalRealizedPNLSOL >= 0 ? "+" : "-";
    const formattedRealizedPNLUSD = `${realizedPNLSignUSD}$${Math.abs(
      totalRealizedPNLUSD
    ).toLocaleString()}`;
    const formattedRealizedPNLSOL = `${realizedPNLSignSOL}${Math.abs(
      totalRealizedPNLSOL
    ).toFixed(0)}`;

    return {
      tokens: {
        value: tokensCount.toString(),
      },
      winRate: { value: winRate },
      trades: {
        successfulTrades: successfulTradesCount.toString(),
        total: `/ ${totalTradesCount}`,
      },
      averageBuy: {
        sol: avgBuySOL.toFixed(1),
        usd: formatCurrency(avgBuyUSD),
      },
      averageEntry: { value: `${formatNumber(trader.avgEntry)}` },
      averageHold: { value: averageHoldFormatted },
      totalInvested: {
        sol: totalInvestedSOL.toFixed(1),
        usd: formatCurrency(totalInvestedUSD),
      },
      roi: { value: roiFormatted },
      realizedPnl: {
        sol: formattedRealizedPNLSOL,
        usd: formattedRealizedPNLUSD,
      },
    };
  }, [trader, traderTrades]);

  if (isLoading) {
    return <div>Loading wallet status...</div>; // Show loading state while checking wallet connection
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0D0B12] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Wallet Not Connected</h1>
          <p className="text-gray-400">
            Please connect your wallet to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (!trader) {
    return <div>Loading trader data...</div>;
  }

  if (!trader) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen w-full">
      <Nav />
      <div className="mx-auto px-4 py-8 w-full max-sm:px-4 max-md:px-6 max-lg:px-10 lg:px-12">
        <div className="flex gap-8 mb-8 lg:mb-16 max-lg:flex-col">
          <div className="flex lg:justify-end max-md:justify-center max-lg:items-start items-end space-y-6">
            <UserProfile
              username={trader.xHandle}
              address={truncateWalletAddress(trader.walletAddress)}
              twitter={`@${trader.socialsUsername}`}
              followers={trader.followers}
              lastTrade="30 min ago"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 max-md:flex-col gap-y-4">
              <TimeframeSelector selected={timeframe} onChange={setTimeframe} />
              <div className="flex items-center gap-4 flex-wrap justify-center text-sm text-gray-400 max-md:justify-end max-md:items-end max-md:w-full max-md:text-end">
                <div className="flex items-center gap-1">
                  <span>Last refreshed seconds ago</span>
                  <button className="w-6 h-6 text-white hover:text-white">
                    <svg
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                      stroke="#000000"
                      strokeWidth="0.01024"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill="#ffffff"
                          d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>

                <button className="text-purple-500 hover:text-purple-400">
                  <Image
                    src="/images/share-icon.svg"
                    alt="share"
                    width={20}
                    height={20}
                    className="w-7 h-7"
                  />
                </button>
              </div>
            </div>
            <StatsOverview stats={calculatedStats} />
          </div>
        </div>

        <LeaderboardTable trades={traderTrades} />
        {console.log(performanceData)}

        <PerformanceGraph data={performanceData}  />
      </div>
    </main>
  );
}

const truncateWalletAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};
