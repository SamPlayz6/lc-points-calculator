export default function MaupkaCTA() {
  return (
    <section className="bg-gradient-to-r from-maupka to-indigo-600 rounded-xl shadow-sm p-5 sm:p-6 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">Struggling with Maths?</h3>
          <p className="text-indigo-100 text-sm mt-1">
            Maupka is your AI maths tutor built for the Irish curriculum.
            It won't give you answers, it'll help you actually understand.
          </p>
        </div>
        <a
          href="https://maupka.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-white text-maupka font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-indigo-50 transition-colors"
        >
          Try Maupka Free
        </a>
      </div>
    </section>
  );
}
