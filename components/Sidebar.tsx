import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transactions", label: "Transactions" },
  { href: "/revenue-by-person", label: "Revenue by person" },
  { href: "/history", label: "History" },
  { href: "/ai-insights", label: "AI insights" }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-white/10 bg-panel p-6">
      <div className="mb-10">
        <p className="font-display text-lg text-gold">Enterprise</p>
        <p className="font-display text-lg text-bone -mt-1">Management</p>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm text-bone/80 hover:bg-white/5 hover:text-gold transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
