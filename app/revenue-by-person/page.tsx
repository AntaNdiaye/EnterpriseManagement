"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Replace with a Prisma groupBy on Transaction, by userId and month, e.g.
// SELECT user_id, date_trunc('month', date) AS month, SUM(amount) FROM "Transaction" GROUP BY 1, 2
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const people: Record<string, number[]> = {
  Anta: [1200, 1350, 1180, 1420, 1500, 1600, 1750, 1850, 0, 0, 0, 0],
  Djibril: [900, 950, 1020, 1100, 1080, 1150, 1200, 1240, 0, 0, 0, 0],
  DDD: [850, 880, 910, 960, 1000, 1050, 1120, 1190, 0, 0, 0, 0]
};

function yearTotal(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

export default function RevenueByPersonPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-bone mb-6">Revenue by person — 2026</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {Object.entries(people).map(([name, values]) => (
          <div key={name} className="rounded-xl border border-white/10 bg-panel p-5">
            <p className="text-sm text-bone/60">{name}</p>
            <p className="mt-1 font-display text-2xl text-bone">
              ${yearTotal(values).toLocaleString()}
            </p>
            <p className="text-xs text-gold mt-1">Year to date</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-panel p-5 mb-8">
        <p className="text-sm text-bone/60 mb-4">Monthly revenue by person</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={months.map((month, i) => ({
                month,
                ...Object.fromEntries(Object.entries(people).map(([name, values]) => [name, values[i]]))
              }))}
            >
              <XAxis dataKey="month" stroke="#F5F1E8" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "rgba(199,154,75,0.08)" }}
                contentStyle={{ background: "#141210", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                labelStyle={{ color: "#F5F1E8" }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: "#F5F1E8" }} />
              <Bar dataKey="Anta" fill="#C79A4B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Djibril" fill="#E4C480" radius={[4, 4, 0, 0]} />
              <Bar dataKey="DDD" fill="#8A6A2F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-bone/60 border-b border-white/10">
              <th className="px-4 py-3">Month</th>
              {Object.keys(people).map((name) => (
                <th key={name} className="px-4 py-3">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {months.map((month, i) => (
              <tr key={month} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-2 text-bone/70">{month}</td>
                {Object.values(people).map((values, j) => (
                  <td key={j} className="px-4 py-2 text-bone">
                    {values[i] > 0 ? `$${values[i].toLocaleString()}` : <span className="text-bone/30">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-white/10 font-medium">
              <td className="px-4 py-3 text-bone">Total</td>
              {Object.values(people).map((values, j) => (
                <td key={j} className="px-4 py-3 text-gold">
                  ${yearTotal(values).toLocaleString()}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
