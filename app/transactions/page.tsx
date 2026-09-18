import { augustTransactions, monthlyTotals } from "@/lib/sample-data";

// Replace augustTransactions with a real query once transactions exist, e.g.
// prisma.transaction.findMany({ where: { date: { gte: startOfMonth, lte: endOfMonth } }, orderBy: { date: "asc" } })
export default function TransactionsPage() {
  const totals = monthlyTotals(augustTransactions);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-bone">Transactions — August</h1>
        <button className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-ink hover:bg-gold-light transition-colors">
          Add transaction
        </button>
      </div>

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
            {augustTransactions.map((row, i) => (
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
    </div>
  );
}
