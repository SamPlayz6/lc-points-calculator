export default function Header() {
  return (
    <header className="border-b border-ink/10">
      <div className="max-w-3xl mx-auto px-4 py-5 sm:py-6">
        <div className="flex items-baseline justify-between">
          <h1 className="font-[family-name:var(--font-display)] text-[1.5rem] sm:text-[1.75rem] leading-tight tracking-tight text-ink">
            LC Points Calculator
          </h1>
          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] text-ink-muted tracking-wide">
            2026
          </span>
        </div>
        <p className="mt-1 text-[0.82rem] text-ink-muted italic">
          Grades in, points out, courses matched.
        </p>
      </div>
    </header>
  );
}
