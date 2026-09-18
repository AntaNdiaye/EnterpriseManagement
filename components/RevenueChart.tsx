"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export default function RevenueChart({ data }: { data: { month: string; revenue: number }[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-panel p-5">
      <p className="text-sm text-bone/60 mb-4">Monthly revenue</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#F5F1E8" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(199,154,75,0.1)" }}
              contentStyle={{ background: "#141210", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
              labelStyle={{ color: "#F5F1E8" }}
              itemStyle={{ color: "#C79A4B" }}
            />
            <Bar dataKey="revenue" fill="#C79A4B" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
