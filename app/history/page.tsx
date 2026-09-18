"use client";

import { useState } from "react";
import { history, availableYears, availableMonths, monthlyTotals } from "@/lib/sample-data";

// Replace `history` with a Prisma query filtered by the selected year/month
// once transactions are logged, e.g.
// prisma.transaction.findMany({ where: { date: { gte: start, lt: end } }, orderBy: { date: "asc" } })
export default function HistoryPage() {
  const years = availableYears();
  const [year, setYear] = useState(years[0]);
  const months = availableMonths(year);
  const [month, setMonth] = useState(months[0]);

  const rows = history[year]?.[month] ?? [];
  const totals = monthlyTotals(rows);

  function onYearChange(newYear: string) {
    setYear(newYear);
    setMonth(availableMonths(newYear)[0]);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl text-bone">History</h1>
        <div className="flex gap-2">
          <select
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            className="rounded-md bg-panel border border-white/10 text-sm text-bone px-3 py-1.5"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-md bg-panel border border-white/10 text-sm text-bone px-3 py-1.5"
          >
            {availableMonths(year).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-bone/50">No transactions recorded for this month.</p>
      ) : (
        <div className="rounded-xl border border-white/10 bg-panel overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-bone/60 border-b border-white/10">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">Profit</th>
                <th className="px-4 py-3">Expenses</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2 text-bone/70">{row.date}</td>
                  <td className="px-4 py-2 text-bone">{row.product}</td>
                  <td className="px-4 py-2 text-bone">{row.cost > 0 ? `$${row.cost}` : <span className="text-bone/30">—</span>}</td>
                  <td className="px-4 py-2 text-green-400">{row.profit > 0 ? `$${row.profit}` : <span className="text-bone/30">—</span>}</td>
                  <td className="px-4 py-2 text-red-400">{row.expenses > 0 ? `$${row.expenses}` : <span className="text-bone/30">—</span>}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/10 font-medium">
                <td className="px-4 py-3 text-bone" colSpan={2}>Total</td>
                <td className="px-4 py-3 text-gold">${totals.cost.toLocaleString()}</td>
                <td className="px-4 py-3 text-gold">${totals.profit.toLocaleString()}</td>
                <td className="px-4 py-3 text-gold">${totals.expenses.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
