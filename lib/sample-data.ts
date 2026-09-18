// Sample data shared by the dashboard and transactions pages until real
// transactions are logged. Replace with Prisma queries against the
// Transaction model (see prisma/schema.prisma).

export type TransactionRow = {
  date: string;
  product: string;
  cost: number;
  profit: number;
  expenses: number;
};

export const augustTransactions: TransactionRow[] = [
  { date: "Aug 2", product: "Hoodie restock", cost: 320, profit: 0, expenses: 0 },
  { date: "Aug 5", product: "Online order #201", cost: 0, profit: 180, expenses: 0 },
  { date: "Aug 9", product: "Delivery fees", cost: 0, profit: 0, expenses: 45 },
  { date: "Aug 12", product: "Online order #204", cost: 0, profit: 240, expenses: 0 },
  { date: "Aug 14", product: "Fabric supplier order", cost: 480, profit: 0, expenses: 0 },
  { date: "Aug 17", product: "Pop-up booth fee", cost: 0, profit: 0, expenses: 90 },
  { date: "Aug 19", product: "Wholesale order", cost: 0, profit: 640, expenses: 0 },
  { date: "Aug 23", product: "Packaging supplies", cost: 0, profit: 0, expenses: 60 },
  { date: "Aug 27", product: "Online order #211", cost: 0, profit: 310, expenses: 0 }
];

export function monthlyTotals(rows: TransactionRow[]) {
  return rows.reduce(
    (totals, row) => ({
      cost: totals.cost + row.cost,
      profit: totals.profit + row.profit,
      expenses: totals.expenses + row.expenses
    }),
    { cost: 0, profit: 0, expenses: 0 }
  );
}

// Sample historical data for the History page, keyed by year then month.
// Replace with a query filtered by the selected year/month, e.g.
// prisma.transaction.findMany({ where: { date: { gte: start, lte: end } } })
export const history: Record<string, Record<string, TransactionRow[]>> = {
  "2026": {
    Aug: augustTransactions,
    Jul: [
      { date: "Jul 3", product: "Online order #188", cost: 0, profit: 210, expenses: 0 },
      { date: "Jul 10", product: "Fabric supplier order", cost: 400, profit: 0, expenses: 0 },
      { date: "Jul 14", product: "Delivery fees", cost: 0, profit: 0, expenses: 38 },
      { date: "Jul 22", product: "Wholesale order", cost: 0, profit: 520, expenses: 0 },
      { date: "Jul 28", product: "Pop-up booth fee", cost: 0, profit: 0, expenses: 80 }
    ],
    Jun: [
      { date: "Jun 5", product: "Online order #172", cost: 0, profit: 260, expenses: 0 },
      { date: "Jun 11", product: "Hoodie restock", cost: 300, profit: 0, expenses: 0 },
      { date: "Jun 19", product: "Packaging supplies", cost: 0, profit: 0, expenses: 55 },
      { date: "Jun 25", product: "Wholesale order", cost: 0, profit: 480, expenses: 0 }
    ]
  },
  "2025": {
    Dec: [
      { date: "Dec 4", product: "Holiday pop-up sales", cost: 0, profit: 890, expenses: 0 },
      { date: "Dec 12", product: "Bulk fabric order", cost: 620, profit: 0, expenses: 0 },
      { date: "Dec 20", product: "Booth rental", cost: 0, profit: 0, expenses: 150 }
    ],
    Nov: [
      { date: "Nov 8", product: "Online order #140", cost: 0, profit: 310, expenses: 0 },
      { date: "Nov 15", product: "Packaging supplies", cost: 0, profit: 0, expenses: 40 }
    ]
  }
};

export function availableYears() {
  return Object.keys(history).sort((a, b) => Number(b) - Number(a));
}

export function availableMonths(year: string) {
  return Object.keys(history[year] ?? {});
}
