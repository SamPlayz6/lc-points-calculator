import { useState, useMemo } from 'react';
import SubjectRow from './SubjectRow';
import { type Grade, type SubjectEntry, calculateTotal } from '../data/points';

const INITIAL_ROWS = 6;

function createEmptyEntry(): SubjectEntry {
  return { subject: '', grade: '' as Grade };
}

export default function Calculator({ onPointsChange }: { onPointsChange: (points: number) => void }) {
  const [entries, setEntries] = useState<SubjectEntry[]>(
    () => Array.from({ length: INITIAL_ROWS }, createEmptyEntry)
  );

  const result = useMemo(() => {
    const r = calculateTotal(entries);
    onPointsChange(r.total);
    return r;
  }, [entries, onPointsChange]);

  const usedSubjects = entries.map(e => e.subject).filter(Boolean);

  function updateSubject(index: number, subject: string) {
    setEntries(prev => {
      const next = [...prev];
      next[index] = { subject, grade: '' as Grade };
      return next;
    });
  }

  function updateGrade(index: number, grade: Grade) {
    setEntries(prev => {
      const next = [...prev];
      next[index] = { ...next[index], grade };
      return next;
    });
  }

  function removeRow(index: number) {
    setEntries(prev => prev.filter((_, i) => i !== index));
  }

  function addRow() {
    setEntries(prev => [...prev, createEmptyEntry()]);
  }

  function resetAll() {
    setEntries(Array.from({ length: INITIAL_ROWS }, createEmptyEntry));
  }

  const filledCount = entries.filter(e => e.grade !== '').length;

  return (
    <section>
      {/* Points total — DOMINANT, first thing you see */}
      <div className="pt-8 sm:pt-10 pb-6 sm:pb-8 border-b border-ink/10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="sc text-[0.7rem] text-ink-muted font-medium">
              your cao points {filledCount > 0 && <span className="text-ink-muted/50">(best 6 of {filledCount})</span>}
            </div>
            {result.mathsBonus && (
              <div className="text-[0.7rem] text-accent font-medium mt-1">
                +25 HL Maths bonus
              </div>
            )}
          </div>
          <div className="font-[family-name:var(--font-display)] text-[4rem] sm:text-[5.5rem] text-ink leading-[0.85] tabular-nums points-animate tracking-tight" key={result.total}>
            {result.total}
          </div>
        </div>

        {result.total > 0 && result.breakdown.length > 0 && (
          <div className="mt-5 pt-4 border-t border-dashed border-ink/10 flex items-start justify-between gap-4">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-ink-muted">
              {result.breakdown.map((b, i) => (
                <span key={i} className="whitespace-nowrap">
                  <span className="text-ink-light">{b.subject}</span>{' '}
                  <span className="font-[family-name:var(--font-mono)] text-[0.7rem] text-ink">
                    {b.points}{b.bonus > 0 && <span className="text-accent">+{b.bonus}</span>}
                  </span>
                </span>
              ))}
            </div>
            <button
              onClick={() => {
                const text = `I got ${result.total} CAO points!\n${result.breakdown.map(b => `${b.subject}: ${b.points}${b.bonus > 0 ? `+${b.bonus}` : ''}`).join('\n')}\n\nCalculate yours: https://lcpoints.sdd.ie`;
                if (navigator.share) {
                  navigator.share({ title: 'My LC Points', text });
                } else {
                  navigator.clipboard.writeText(text);
                  const btn = document.activeElement as HTMLButtonElement;
                  const orig = btn.textContent;
                  btn.textContent = 'Copied';
                  setTimeout(() => { btn.textContent = orig; }, 2000);
                }
              }}
              className="shrink-0 text-[0.7rem] text-ink-muted hover:text-ink font-medium sc"
            >
              Share
            </button>
          </div>
        )}
      </div>

      {/* Subject list — compact, functional, no card */}
      <div className="py-5">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="sc text-[0.72rem] text-ink-muted font-medium">Subjects</h2>
          <button
            onClick={resetAll}
            className="text-[0.7rem] text-ink-muted hover:text-accent font-medium"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-1">
          {entries.map((entry, i) => (
            <SubjectRow
              key={i}
              index={i}
              subject={entry.subject}
              grade={entry.grade}
              usedSubjects={usedSubjects}
              onSubjectChange={updateSubject}
              onGradeChange={updateGrade}
              onRemove={removeRow}
              canRemove={entries.length > 1}
            />
          ))}
        </div>

        {entries.length < 12 && (
          <button
            onClick={addRow}
            className="mt-2 text-[0.8rem] text-ink-muted hover:text-ink font-medium"
          >
            + Add subject
          </button>
        )}
      </div>
    </section>
  );
}
