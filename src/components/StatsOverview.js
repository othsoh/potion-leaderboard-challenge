import Image from "next/image";

export default function StatsOverview({ stats }) {
  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-px bg-gray-800 overflow-hidden">
      {/* Row 1 */}
      <StatCell label="Tokens" value={stats.tokens.value}  />
      <StatCell
        label="Average Buy"
        value={stats.averageBuy.sol}
        secondary={stats.averageBuy.usd}
      />
      <StatCell
        label="Total Invested"
        value={stats.totalInvested.sol}
        secondary={stats.totalInvested.usd}
      />

      {/* Row 2 */}
      <StatCell
        label="Win Rate"
        value={stats.winRate.value}
        valueClass="text-[#59CC6C]"
      />
      <StatCell label="Average Entry" value={stats.averageEntry.value} />
      <StatCell
        label="ROI"
        value={stats.roi.value}
        valueClass="text-[#59CC6C]"
      />

      {/* Row 3 */}
      <StatCell
        label="Trades"
        value={stats.trades.successfulTrades}
        secondary={stats.trades.total}
        valueClass="text-[#59CC6C]"
      />
      <StatCell label="Average Hold" value={stats.averageHold.value} />
      <StatCell
        label="Realized PNL"
        value={stats.realizedPnl.sol}
        secondary={stats.realizedPnl.usd}
        valueClass="text-[#59CC6C]"
      />
    </div>
  );
}

function StatCell({ label, value, secondary, valueClass = "" }) {
  const isTrades = label === "Trades";
  return (
    <div className="bg-[#1A1825] flex w-full justify-between items-center p-4">
      <div className="font-semibold mb-1">{label}</div>
      <div className={`flex gap-2 font-light ${isTrades ? "flex items-center" : "flex-col"} items-end`}>
        <span className={`text-lg ${valueClass}`}>
          {value}
          {label === "Average Buy" || label === "Total Invested" || label === "Realized PNL" ? (
            <Image
              src="/images/solana.png"
              alt="SOL"
              width={16}
              height={16}
              className="inline-block ml-1"
            />
          ) : null}
        </span>
        {secondary && (
          <span className="text-sm text-gray-400">{secondary}</span>
        )}
      </div>
    </div>
  );
}