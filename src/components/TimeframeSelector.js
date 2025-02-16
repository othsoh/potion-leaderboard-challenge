import TabButton from "@/components/ui/TabButton";

export default function TimeframeSelector({ selected, onChange }) {
  const timeframes = ["Daily", "Weekly", "Monthly", "All-Time"];

  return (
    <div className="flex gap-2">
      {timeframes.map((timeframe) => (
        <TabButton
          key={timeframe}
          label={timeframe}
          isActive={selected === timeframe}
          onClick={() => onChange(timeframe)}
        />
      ))}
    </div>
  );
}

