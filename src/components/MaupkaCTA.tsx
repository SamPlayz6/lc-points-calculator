export default function MaupkaCTA() {
  return (
    <section className="bg-gradient-to-br from-maupka to-indigo-700 rounded-xl shadow-md p-5 sm:p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
        <div>
          <h3 className="font-semibold text-lg">Need help with Maths?</h3>
          <p className="text-indigo-200 text-sm mt-1">
            Maupka is your AI maths tutor built for the Irish curriculum.
            It won't give you answers — it'll help you actually understand.
          </p>
        </div>
        <a
          href="https://maupka.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-white text-maupka font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-indigo-50 hover:shadow-lg"
        >
          Try Free
        </a>
      </div>
    </section>
  );
}
