export default function MaupkaCTA() {
  return (
    <section className="border-t border-ink/10 pt-5 pb-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-[0.85rem] text-ink">
            <span className="font-medium">Stuck on Maths?</span>{' '}
            <span className="text-ink-muted">
              Maupka is an AI tutor for the Irish curriculum. It doesn't give answers. It helps you actually get it.
            </span>
          </p>
        </div>
        <a
          href="https://maupka.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[0.8rem] font-medium text-accent hover:text-ink underline underline-offset-2"
        >
          Try free &rarr;
        </a>
      </div>
    </section>
  );
}
