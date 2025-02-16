"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PerformanceGraph({ data }) {
  return (
    <div className="w-full h-96 mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const trade = payload[0].payload;
                return (
                  <div className="bg-gray-800 p-2 border border-gray-700 rounded-lg">
                    <p className="text-sm text-white">Trade ID: {trade.id}</p>
                    <p className="text-sm text-white">Token: {trade.token}</p>
                    <p className="text-sm text-white">PNL: ${trade.pnl.toLocaleString()}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="pnl"
            stroke="#AA00FF"
            strokeWidth={2}
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}