export default function Footer() {
  return (
    <footer className="text-center text-xs text-gray-400 py-8 space-y-2">
      <p>
        Built by{' '}
        <a href="https://sdd.ie" className="text-gray-500 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
          Sam Dunning
        </a>
        {' '}in Cork, Ireland
      </p>
      <p>
        Points based on the 2017+ grading scale. CAO cutoffs from Round 1, 2025.
        Always verify with{' '}
        <a href="https://www.cao.ie" className="text-gray-500 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
          cao.ie
        </a>
        .
      </p>
      {/* AdSense placeholder */}
      <div id="adsense-footer" className="mt-4" />
    </footer>
  );
}
