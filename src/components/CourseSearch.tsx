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
    <section className="card">
      <div className="px-4 sm:px-6 py-4 border-b border-paper-dark">
        <h2 className="font-[family-name:var(--font-display)] text-lg text-ink">CAO Course Finder</h2>
        <p className="text-sm text-ink-muted mt-0.5">{CAO_COURSES.length} courses from {COLLEGES.length} colleges</p>
      </div>

      <div className="px-4 sm:px-6 py-4 space-y-3">
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setShowAll(false); }}
          placeholder="Try 'Computer Science', 'UCC', or 'CK401'..."
          className="w-full border border-paper-dark rounded-lg px-3 py-2.5 text-sm bg-white text-ink placeholder:text-ink-muted/50 hover:border-ink-muted/30"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={college}
            onChange={e => { setCollege(e.target.value); setShowAll(false); }}
            className="border border-paper-dark rounded-lg px-3 py-2 text-sm bg-white text-ink hover:border-ink-muted/30"
          >
            <option value="">All colleges</option>
            {COLLEGES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {userPoints > 0 && (
            <div className="flex rounded-lg border border-paper-dark overflow-hidden text-sm">
              {(['all', 'qualify', 'close'] as FilterMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => { setFilter(mode); setShowAll(false); }}
                  className={`px-3 py-2 font-medium ${
                    filter === mode
                      ? 'bg-navy-deep text-white'
                      : 'bg-white text-ink-muted hover:bg-paper-warm'
                  }`}
                >
                  {mode === 'all' ? 'All' : mode === 'qualify' ? 'I qualify' : 'Almost there'}
                </button>
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-8 text-ink-muted text-sm">
            No courses match that search
          </div>
        ) : (
          <>
            <div className="text-xs text-ink-muted">{filtered.length} course{filtered.length !== 1 ? 's' : ''}</div>
            <div className="divide-y divide-paper-dark">
              {displayed.map(course => {
                const qualifies = userPoints > 0 && userPoints >= course.points;
                const close = userPoints > 0 && userPoints >= course.points - 30 && !qualifies;
                return (
                  <div key={course.code} className="py-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[0.7rem] font-[family-name:var(--font-mono)] text-ink-muted/50">{course.code}</span>
                        <Link to={`/course/${course.code}`} className="font-medium text-sm text-ink hover:text-navy">{course.name}</Link>
                        {course.note && (
                          <span className="text-[0.65rem] bg-amber-bg text-amber-warn px-1.5 py-0.5 rounded font-medium">
                            {course.note}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-ink-muted mt-0.5">{course.college}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-sm font-semibold tabular-nums font-[family-name:var(--font-mono)] ${
                        qualifies ? 'text-green-ok' : close ? 'text-amber-warn' : 'text-ink'
                      }`}>
                        {course.points}
                      </span>
                      {qualifies && (
                        <span className="text-[0.65rem] bg-green-bg text-green-ok px-1.5 py-0.5 rounded font-medium">
                          You're in
                        </span>
                      )}
                      {close && (
                        <span className="text-[0.65rem] bg-amber-bg text-amber-warn px-1.5 py-0.5 rounded font-medium">
                          {course.points - userPoints} away
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
                className="w-full text-center text-sm text-navy hover:text-ink font-medium py-2"
              >
                Show all {filtered.length} courses
              </button>
            )}
          </>
        )}
      </div>

      <div className="px-4 sm:px-6 py-3 bg-paper-warm border-t border-paper-dark text-[0.7rem] text-ink-muted">
        Points from CAO Round 1, 2025. Cutoffs change yearly. Check <a href="https://www.cao.ie" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">cao.ie</a> for official data.
      </div>
    </section>
  );
}
