export default function Footer() {
  return (
    <footer className="text-center py-10 px-4 space-y-3">
      <div className="flex items-center justify-center gap-4 text-sm text-ink-muted">
        <a href="https://cgt.sdd.ie" className="hover:text-ink">CGT Calculator</a>
        <span className="text-paper-dark">|</span>
        <a href="https://sdd.ie" className="hover:text-ink">More tools</a>
      </div>
      <p className="text-[0.75rem] text-ink-muted/60">
        Made in Cork by{' '}
        <a href="https://sdd.ie" className="hover:text-ink" target="_blank" rel="noopener noreferrer">Sam Dunning</a>.
        Points from 2017+ scale. CAO cutoffs from Round 1, 2025.
        Verify at{' '}
        <a href="https://www.cao.ie" className="hover:text-ink" target="_blank" rel="noopener noreferrer">cao.ie</a>.
      </p>
      <div id="adsense-footer" className="mt-4" />
    </footer>
  );
}
