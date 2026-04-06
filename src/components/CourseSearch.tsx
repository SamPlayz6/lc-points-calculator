import { useState, useMemo } from 'react';
import { CAO_COURSES, COLLEGES } from '../data/cao-cutoffs';

interface Props {
  userPoints: number;
}

type FilterMode = 'all' | 'qualify' | 'close';

export default function CourseSearch({ userPoints }: Props) {
  const [search, setSearch] = useState('');
  const [college, setCollege] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let courses = CAO_COURSES;

    if (search) {
      const q = search.toLowerCase();
      courses = courses.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.college.toLowerCase().includes(q)
      );
    }

    if (college) {
      courses = courses.filter(c => c.college === college);
    }

    if (filter === 'qualify' && userPoints > 0) {
      courses = courses.filter(c => userPoints >= c.points);
    } else if (filter === 'close' && userPoints > 0) {
      courses = courses.filter(c => userPoints >= c.points - 30 && userPoints < c.points);
    }

    return courses.sort((a, b) => b.points - a.points);
  }, [search, college, filter, userPoints]);

  const displayed = showAll ? filtered : filtered.slice(0, 20);
  const hasMore = filtered.length > 20 && !showAll;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden card-hover">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">CAO Course Finder</h2>
        <p className="text-sm text-gray-500 mt-0.5">Search {CAO_COURSES.length} courses by name, code, or college</p>
      </div>

      <div className="px-4 sm:px-6 py-4 space-y-3">
        {/* Search & filters */}
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setShowAll(false); }}
          placeholder="Search courses, e.g. Computer Science, UCC, CK401..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-light focus:border-primary-light outline-none"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={college}
            onChange={e => { setCollege(e.target.value); setShowAll(false); }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
          >
            <option value="">All colleges</option>
            {COLLEGES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {userPoints > 0 && (
            <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
              {(['all', 'qualify', 'close'] as FilterMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => { setFilter(mode); setShowAll(false); }}
                  className={`px-3 py-2 transition-colors ${
                    filter === mode
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {mode === 'all' ? 'All' : mode === 'qualify' ? 'I qualify' : 'Almost there'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No courses found matching your search
          </div>
        ) : (
          <>
            <div className="text-xs text-gray-500">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</div>
            <div className="divide-y divide-gray-100">
              {displayed.map(course => {
                const qualifies = userPoints > 0 && userPoints >= course.points;
                const close = userPoints > 0 && userPoints >= course.points - 30 && !qualifies;
                return (
                  <div key={course.code} className="py-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-gray-400">{course.code}</span>
                        <span className="font-medium text-sm text-gray-900">{course.name}</span>
                        {course.note && (
                          <span className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
                            {course.note}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{course.college}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-sm font-semibold tabular-nums ${
                        qualifies ? 'text-green-600' : close ? 'text-amber-600' : 'text-gray-700'
                      }`}>
                        {course.points}
                      </span>
                      {qualifies && (
                        <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium">
                          Qualified
                        </span>
                      )}
                      {close && (
                        <span className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                          -{course.points - userPoints}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full text-center text-sm text-primary hover:text-primary-dark font-medium py-2 transition-colors"
              >
                Show all {filtered.length} courses
              </button>
            )}
          </>
        )}
      </div>

      <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
        Points based on CAO Round 1, 2025. Cutoffs change yearly. Always check cao.ie for official data.
      </div>
    </section>
  );
}
