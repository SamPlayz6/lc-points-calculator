import { useState, useCallback } from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import CourseSearch from './components/CourseSearch';
import MaupkaCTA from './components/MaupkaCTA';
import Footer from './components/Footer';

export default function App() {
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
