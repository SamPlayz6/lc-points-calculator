import { useParams, Link } from 'react-router-dom';
import { CAO_COURSES } from '../data/cao-cutoffs';
import Header from './Header';
import MaupkaCTA from './MaupkaCTA';
import Footer from './Footer';

function getGradesNeeded(points: number): string {
  // Points per grade: H1=100, H2=88, H3=77, H4=66, H5=56, H6=46
  // Maths bonus: +25 if H6 or above in HL Maths

  if (points >= 625) return '6 H1s (including HL Maths bonus)';
  if (points >= 600) return '5 H1s + H2 (with HL Maths bonus)';
  if (points >= 553) return '4 H1s + 2 H2s (with HL Maths bonus)';
  if (points >= 500) return '3 H1s + 3 H2s (with HL Maths bonus)';
  if (points >= 450) return '2 H1s + 4 H3s (with HL Maths bonus)';
  if (points >= 400) return '6 H3s (with HL Maths bonus)';
  if (points >= 350) return '3 H3s + 3 H4s (with HL Maths bonus)';
  if (points >= 300) return '6 H5s or 3 H4s + 3 H5s';
  if (points >= 250) return '6 H5s or 3 H5s + 3 O1s';
  if (points >= 200) return '3 H6s + 3 O2s';
  return '6 O1-O3s';
}

function getSimilarCourses(course: typeof CAO_COURSES[0]) {
  return CAO_COURSES
    .filter(c => c.code !== course.code && (
      c.name.toLowerCase().includes(course.name.split(' ')[0].toLowerCase()) ||
      c.college === course.college
    ))
    .sort((a, b) => Math.abs(a.points - course.points) - Math.abs(b.points - course.points))
    .slice(0, 6);
}

export default function CoursePage() {
  const { code } = useParams<{ code: string }>();
  const course = CAO_COURSES.find(c => c.code.toLowerCase() === code?.toLowerCase());

  if (!course) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <p className="text-gray-600 mb-6">The course code "{code}" wasn't found in our database.</p>
          <Link to="/" className="text-primary hover:text-primary-dark font-medium">
            Back to calculator
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const similar = getSimilarCourses(course);
  const gradesNeeded = getGradesNeeded(course.points);

  // Update document title for SEO
  document.title = `${course.code} ${course.name} — ${course.points} CAO Points | ${course.college}`;

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content',
      `${course.code} ${course.name} at ${course.college} requires ${course.points} CAO points (2025 Round 1). Calculate your LC points and see if you qualify.`
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-8 space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500">
          <Link to="/" className="hover:text-primary transition-colors">Calculator</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{course.code}</span>
        </nav>

        {/* Course header */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-6">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-sm font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{course.code}</span>
              {course.note && (
                <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-medium">{course.note}</span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{course.name}</h1>
            <p className="text-gray-600">{course.college}</p>
          </div>

          <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">CAO Points (2025)</div>
                <div className="text-3xl font-bold text-primary tabular-nums">{course.points}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Grades needed</div>
                <div className="text-lg font-semibold text-gray-800">{gradesNeeded}</div>
                <div className="text-xs text-gray-500 mt-0.5">Approximate combination</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Check your points</div>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors mt-1"
                >
                  Open calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Points context */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About the points requirement</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>{course.name}</strong> at {course.college} required <strong>{course.points} CAO points</strong> in Round 1 of 2025.
              This is the minimum number of points that secured an offer in the most recent admissions cycle.
            </p>
            <p>
              Points cutoffs change every year based on demand and the number of available places.
              Use our <Link to="/" className="text-primary hover:text-primary-dark font-medium">LC Points Calculator</Link> to
              see how your predicted grades compare.
            </p>
            {course.note && (
              <p className="bg-amber-50 text-amber-800 p-3 rounded-lg text-xs">
                <strong>Note:</strong> {course.code} {course.name} has additional requirements: {course.note}.
                Points alone may not guarantee an offer.
              </p>
            )}
          </div>
        </section>

        <MaupkaCTA />

        {/* Similar courses */}
        {similar.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Similar courses</h2>
              <p className="text-sm text-gray-500 mt-0.5">Other courses at {course.college} or in the same field</p>
            </div>
            <div className="divide-y divide-gray-100">
              {similar.map(c => (
                <Link
                  key={c.code}
                  to={`/course/${c.code}`}
                  className="flex items-center justify-between px-4 sm:px-6 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-gray-400">{c.code}</span>
                      <span className="font-medium text-sm text-gray-900">{c.name}</span>
                    </div>
                    <div className="text-xs text-gray-500">{c.college}</div>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-gray-700 shrink-0 ml-3">{c.points}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SEO content */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Frequently asked questions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800">How many points do I need for {course.name}?</h3>
              <p className="text-gray-600 mt-1">
                You need {course.points} CAO points based on the 2025 Round 1 cutoff at {course.college} ({course.code}).
                This can change each year.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">What grades do I need?</h3>
              <p className="text-gray-600 mt-1">
                To reach {course.points} points, you approximately need {gradesNeeded} across your best 6 Leaving Cert subjects.
                Remember, Higher Level Maths gives +25 bonus points if you get H6 or above.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Can the points go up or down?</h3>
              <p className="text-gray-600 mt-1">
                Yes. CAO cutoff points change every year depending on the number of applicants and available places.
                Always check <a href="https://www.cao.ie" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">cao.ie</a> for
                the most up-to-date information.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Structured data for this course */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: `${course.code} ${course.name}`,
            description: `${course.name} at ${course.college}. Requires ${course.points} CAO points (2025 Round 1 cutoff).`,
            provider: {
              '@type': 'CollegeOrUniversity',
              name: course.college,
            },
          }),
        }}
      />
      {/* FAQ structured data for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `How many points do I need for ${course.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `You need ${course.points} CAO points based on the 2025 Round 1 cutoff at ${course.college} (${course.code}). This can change each year.`,
                },
              },
              {
                '@type': 'Question',
                name: `What grades do I need for ${course.code}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `To reach ${course.points} points, you approximately need ${gradesNeeded} across your best 6 Leaving Cert subjects. Higher Level Maths gives +25 bonus points if you get H6 or above.`,
                },
              },
              {
                '@type': 'Question',
                name: 'Can the points go up or down?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. CAO cutoff points change every year depending on the number of applicants and available places. Always check cao.ie for official data.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
