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
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Your Subjects</h2>
        <button
          onClick={resetAll}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Reset all
        </button>
      </div>

      <div className="px-4 sm:px-6 py-4 space-y-2">
        {/* Column headers */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[1fr_120px_60px_40px] gap-2 text-xs text-gray-500 font-medium px-0.5 mb-1">
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
            className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add subject
          </button>
        </div>
      )}

      {/* Points total */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-5">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-sm text-gray-500">
              Your CAO Points {filledCount > 0 && <span>(best 6 of {filledCount})</span>}
            </div>
            {result.mathsBonus && (
              <div className="text-xs text-accent mt-0.5 font-medium">
                Includes +25 Higher Level Maths bonus
              </div>
            )}
          </div>
          <div className="text-4xl sm:text-5xl font-bold text-primary tabular-nums">
            {result.total}
          </div>
        </div>

        {result.total > 0 && result.breakdown.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-500 font-medium mb-2">Breakdown (best 6)</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs">
              {result.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-600 truncate mr-2">{b.subject}</span>
                  <span className="font-medium tabular-nums text-gray-800">
                    {b.points}{b.bonus > 0 && <span className="text-accent">+{b.bonus}</span>}
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
