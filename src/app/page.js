"use client";
import { Nav } from "@/components/Nav";
import { NavTabs } from "@/components/TableNav";
import { TradesTable } from "@/components/TradersTable";
import { WalletProvider } from "@/contexts/wallet-context";
import Image from "next/image";
import { trades } from "@/data/mock-data";
import { useState } from "react";

export default function Home() {
  const [showConnectModal, setShowConnectModal] = useState(false);
  return (
    <main className="min-h-screen bg-[#0D0B12]">
      <div className="">
        <WalletProvider>
          <div
            className={`relative transition-all duration-300 ${
              showConnectModal ? "blur-sm" : ""
            }`}
          >
            <Nav />
            <NavTabs />
          </div>
        </WalletProvider>
      </div>
    </main>
  );
}
