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
    <section className="card">
      <div className="px-4 sm:px-6 py-4 border-b border-paper-dark flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-display)] text-lg text-ink">Your Subjects</h2>
        <button
          onClick={resetAll}
          className="text-xs text-ink-muted hover:text-ink-light font-medium"
        >
          Start over
        </button>
      </div>

      <div className="px-4 sm:px-6 py-4 space-y-2">
        <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[1fr_120px_60px_40px] gap-2 text-[0.7rem] text-ink-muted font-medium tracking-wide uppercase px-0.5 mb-1">
          <span>Subject</span>
          <span>Grade</span>
          <span className="text-right">Pts</span>
          <span></span>
        </div>

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
        <div className="px-4 sm:px-6 pb-4">
          <button
            onClick={addRow}
            className="text-sm text-navy hover:text-ink font-medium flex items-center gap-1.5"
          >
            <span className="w-5 h-5 rounded-full bg-navy/5 flex items-center justify-center text-navy text-xs">+</span>
            Add subject
          </button>
        </div>
      )}

      {/* Points total — the moment of truth */}
      <div className="bg-gold-bg border-t border-paper-dark px-4 sm:px-6 py-6">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-sm text-ink-muted">
              Your CAO Points {filledCount > 0 && <span className="text-ink-muted/60">(best 6 of {filledCount})</span>}
            </div>
            {result.mathsBonus && (
              <div className="text-xs text-gold font-medium mt-1 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" />
                +25 HL Maths bonus included
              </div>
            )}
          </div>
          <div className="font-[family-name:var(--font-display)] text-[2.5rem] sm:text-[3.25rem] text-navy-deep tabular-nums points-animate leading-none" key={result.total}>
            {result.total}
          </div>
        </div>

        {result.total > 0 && result.breakdown.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gold/10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[0.7rem] text-ink-muted font-medium tracking-wide uppercase">Breakdown</div>
              <button
                onClick={() => {
                  const text = `I got ${result.total} CAO points!\n${result.breakdown.map(b => `${b.subject}: ${b.points}${b.bonus > 0 ? `+${b.bonus}` : ''}`).join('\n')}\n\nCalculate yours: https://lcpoints.sdd.ie`;
                  if (navigator.share) {
                    navigator.share({ title: 'My LC Points', text });
                  } else {
                    navigator.clipboard.writeText(text);
                    const btn = document.activeElement as HTMLButtonElement;
                    const orig = btn.textContent;
                    btn.textContent = 'Copied!';
                    setTimeout(() => { btn.textContent = orig; }, 2000);
                  }
                }}
                className="text-xs text-navy hover:text-ink font-medium flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                Share
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-[0.8rem]">
              {result.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-ink-muted truncate mr-2">{b.subject}</span>
                  <span className="font-medium tabular-nums text-ink font-[family-name:var(--font-mono)] text-xs">
                    {b.points}{b.bonus > 0 && <span className="text-gold">+{b.bonus}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
