import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Calculator from './components/Calculator';
import CourseSearch from './components/CourseSearch';
import MaupkaCTA from './components/MaupkaCTA';
import Footer from './components/Footer';
import CoursePage from './components/CoursePage';

function HomePage() {
  const [points, setPoints] = useState(0);
  const handlePointsChange = useCallback((p: number) => setPoints(p), []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-8 space-y-6">
        {/* AdSense placeholder */}
        <div id="adsense-top" />

        <Calculator onPointsChange={handlePointsChange} />

        <MaupkaCTA />

        <CourseSearch userPoints={points} />
      </main>

      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-display)] text-ink">
            Page not found
          </h1>
          <p className="text-ink-muted">
            The page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block mt-2 px-6 py-3 bg-navy-deep text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Back to Calculator
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:code" element={<CoursePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
