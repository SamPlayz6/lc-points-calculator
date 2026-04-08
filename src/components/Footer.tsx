export default function Footer() {
  return (
    <footer className="max-w-3xl mx-auto w-full px-4">
      <div className="border-t border-ink/10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="text-[0.72rem] text-ink-muted/60">
          Made in Cork by{' '}
          <a href="https://sdd.ie" className="hover:text-ink" target="_blank" rel="noopener noreferrer">Sam Dunning</a>.
          Points from 2017+ scale. CAO cutoffs from Round 1, 2025.
        </p>
        <div className="flex items-center gap-3 text-[0.72rem] text-ink-muted/50">
          <a href="https://cgt.sdd.ie" className="hover:text-ink">CGT Calculator</a>
          <a href="https://sdd.ie" className="hover:text-ink">More tools</a>
          <a href="https://www.cao.ie" className="hover:text-ink" target="_blank" rel="noopener noreferrer">cao.ie</a>
        </div>
      </div>
      <div id="adsense-footer" className="mb-4" />
    </footer>
  );
}
