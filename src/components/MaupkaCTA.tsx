export default function MaupkaCTA() {
  return (
    <section className="bg-maupka-deep rounded-xl p-5 sm:p-6 text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full border border-white/[0.06]" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full border border-white/[0.04]" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg">Stuck on Maths?</h3>
          <p className="text-white/50 text-sm mt-1.5 max-w-sm">
            Maupka is an AI tutor built for the Irish curriculum. It doesn't give answers. It helps you actually get it.
          </p>
        </div>
        <a
          href="https://maupka.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-white text-maupka-deep font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-white/90 hover:shadow-lg"
        >
          Try free
        </a>
      </div>
    </section>
  );
}
