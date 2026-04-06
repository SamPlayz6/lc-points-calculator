export default function Header() {
  return (
    <header className="bg-hero text-white">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center text-accent-light font-bold text-lg">
            LC
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Points Calculator <span className="text-accent-light">2026</span>
          </h1>
        </div>
        <p className="mt-1 text-emerald-300/70 text-sm sm:text-base pl-12">
          Calculate your Leaving Cert points and find CAO courses you qualify for
        </p>
      </div>
    </header>
  );
}
