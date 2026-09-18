import MetricCard from "@/components/MetricCard";
import RevenueChart from "@/components/RevenueChart";
import { augustTransactions, monthlyTotals } from "@/lib/sample-data";

// This reuses the same sample transactions shown on the Transactions page,
// so the two pages always agree. Replace with a real Prisma query once
// transactions exist, e.g.
// prisma.transaction.aggregate({ _sum: { cost: true, profit: true, expenses: true } })
const totals = monthlyTotals(augustTransactions);

// Replace with a monthly groupBy query, e.g.
// SELECT date_trunc('month', date) AS month, SUM(amount) FROM "Transaction"
// WHERE type = 'INCOME' GROUP BY 1 ORDER BY 1
const monthlyRevenue = [
  { month: "Jan", revenue: 1650 },
  { month: "Feb", revenue: 1900 },
  { month: "Mar", revenue: 2100 },
  { month: "Apr", revenue: 2600 },
  { month: "May", revenue: 3050 },
  { month: "Jun", revenue: 2800 },
  { month: "Jul", revenue: 3820 },
  { month: "Aug", revenue: 4280 },
  { month: "Sep", revenue: 0 },
  { month: "Oct", revenue: 0 },
  { month: "Nov", revenue: 0 },
  { month: "Dec", revenue: 0 }
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-bone mb-6">This month</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Total cost" value={`$${totals.cost.toLocaleString()}`} />
        <MetricCard label="Total profit" value={`$${totals.profit.toLocaleString()}`} />
        <MetricCard label="Total expenses" value={`$${totals.expenses.toLocaleString()}`} />
      </div>
      <RevenueChart data={monthlyRevenue} />
    </div>
  );
}
