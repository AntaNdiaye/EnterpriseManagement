export default function MetricCard({
  label,
  value,
  hint
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-panel p-5">
      <p className="text-sm text-bone/60">{label}</p>
      <p className="mt-1 font-display text-2xl text-bone">{value}</p>
      {hint && <p className="mt-1 text-xs text-gold">{hint}</p>}
    </div>
  );
}
