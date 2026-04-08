export default function Header() {
  return (
    <header className="bg-navy-deep text-white relative overflow-hidden">
      {/* Subtle diagonal accent */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)',
      }} />

      <div className="max-w-4xl mx-auto px-4 py-7 sm:py-9 relative">
        <div className="flex items-baseline gap-3">
          <h1 className="font-[family-name:var(--font-display)] text-[1.65rem] sm:text-[2rem] leading-tight tracking-tight">
            LC Points Calculator
          </h1>
          <span className="text-gold-bright font-[family-name:var(--font-mono)] text-sm font-medium bg-white/[0.08] px-2 py-0.5 rounded">
            2026
          </span>
        </div>
        <p className="mt-2 text-[0.9rem] text-white/50 max-w-md">
          Enter your subjects and grades. See your CAO points and what courses you can get into.
        </p>
      </div>
    </header>
  );
}
