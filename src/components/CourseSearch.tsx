import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
    <section className="border-t border-ink/10 pt-6 sm:pt-8">
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="font-[family-name:var(--font-display)] text-[1.25rem] sm:text-[1.4rem] text-ink">
          Course Finder
        </h2>
        <span className="text-[0.7rem] text-ink-muted font-[family-name:var(--font-mono)]">
          {CAO_COURSES.length} courses / {COLLEGES.length} colleges
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setShowAll(false); }}
          placeholder="Search 'Computer Science', 'UCC', or 'CK401'..."
          className="w-full border-0 border-b border-ink/15 bg-transparent px-0 py-2 text-[0.9rem] text-ink placeholder:text-ink-muted/40"
        />

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={college}
            onChange={e => { setCollege(e.target.value); setShowAll(false); }}
            className="border border-paper-dark bg-transparent px-2 py-1.5 text-[0.8rem] text-ink rounded"
          >
            <option value="">All colleges</option>
            {COLLEGES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {userPoints > 0 && (
            <div className="flex text-[0.75rem] gap-0">
              {(['all', 'qualify', 'close'] as FilterMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => { setFilter(mode); setShowAll(false); }}
                  className={`px-2.5 py-1.5 font-medium border border-paper-dark -ml-px first:ml-0 first:rounded-l last:rounded-r ${
                    filter === mode
                      ? 'bg-ink text-paper z-10 border-ink'
                      : 'bg-transparent text-ink-muted hover:text-ink'
                  }`}
                >
                  {mode === 'all' ? 'All' : mode === 'qualify' ? 'I qualify' : 'Almost'}
                </button>
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-ink-muted text-[0.85rem]">
            No courses match that search.
          </div>
        ) : (
          <>
            <div className="text-[0.7rem] text-ink-muted font-[family-name:var(--font-mono)] mt-1">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </div>

            {/* Dense table-like layout */}
            <div className="mt-1">
              {/* Column headers */}
              <div className="grid grid-cols-[60px_1fr_auto] sm:grid-cols-[72px_1fr_auto] gap-x-3 py-1.5 border-b border-ink/10 text-[0.65rem] sc text-ink-muted font-medium">
                <span>Code</span>
                <span>Course</span>
                <span className="text-right">Points</span>
              </div>

              {displayed.map(course => {
                const qualifies = userPoints > 0 && userPoints >= course.points;
                const close = userPoints > 0 && userPoints >= course.points - 30 && !qualifies;
                return (
                  <div key={course.code} className="grid grid-cols-[60px_1fr_auto] sm:grid-cols-[72px_1fr_auto] gap-x-3 py-2 border-b border-paper-dark/80 items-baseline hover:bg-paper-warm/50">
                    <span className="font-[family-name:var(--font-mono)] text-[0.7rem] text-ink-muted/60 tracking-tight">
                      {course.code}
                    </span>
                    <div className="min-w-0">
                      <Link to={`/course/${course.code}`} className="text-[0.84rem] text-ink hover:text-accent leading-snug">
                        {course.name}
                      </Link>
                      {course.note && (
                        <span className="ml-1.5 text-[0.6rem] text-amber-warn font-medium align-middle">
                          {course.note}
                        </span>
                      )}
                      <div className="text-[0.7rem] text-ink-muted/60 leading-snug">{course.college}</div>
                    </div>
                    <div className="text-right shrink-0 flex items-baseline gap-1.5 justify-end">
                      <span className={`font-[family-name:var(--font-mono)] text-[0.8rem] font-medium tabular-nums ${
                        qualifies ? 'text-green-ok' : close ? 'text-amber-warn' : 'text-ink'
                      }`}>
                        {course.points}
                      </span>
                      {qualifies && (
                        <span className="text-[0.6rem] text-green-ok font-medium sc">in</span>
                      )}
                      {close && (
                        <span className="text-[0.6rem] text-amber-warn font-medium font-[family-name:var(--font-mono)]">
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
                className="text-[0.8rem] text-ink-muted hover:text-ink font-medium py-2"
              >
                Show all {filtered.length} courses
              </button>
            )}
          </>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-dashed border-ink/8 text-[0.7rem] text-ink-muted/60 italic">
        Points from CAO Round 1, 2025. Cutoffs change yearly. Check{' '}
        <a href="https://www.cao.ie" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">cao.ie</a>{' '}
        for official data.
      </div>
    </section>
  );
}
