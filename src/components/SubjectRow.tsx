import { type Grade, ALL_GRADES, LCVP_GRADES, getPoints, hasMathsBonus, MATHS_BONUS } from '../data/points';
import { LC_SUBJECTS } from '../data/subjects';

interface Props {
  index: number;
  subject: string;
  grade: Grade;
  usedSubjects: string[];
  onSubjectChange: (index: number, subject: string) => void;
  onGradeChange: (index: number, grade: Grade) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export default function SubjectRow({
  index, subject, grade, usedSubjects, onSubjectChange, onGradeChange, onRemove, canRemove,
}: Props) {
  const points = grade ? getPoints(grade) : null;
  const bonus = subject === 'Mathematics' && grade && hasMathsBonus(grade) ? MATHS_BONUS : 0;
  const available = LC_SUBJECTS.filter(s => s === subject || !usedSubjects.includes(s));

  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[1fr_120px_60px_40px] gap-2 items-center">
      <select
        value={subject}
        onChange={e => onSubjectChange(index, e.target.value)}
        className="border border-paper-dark rounded-lg px-3 py-2.5 text-sm bg-white text-ink truncate hover:border-ink-muted/30"
      >
        <option value="">Pick a subject...</option>
        {available.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={grade}
        onChange={e => onGradeChange(index, e.target.value as Grade)}
        disabled={!subject}
        className="border border-paper-dark rounded-lg px-3 py-2.5 text-sm bg-white text-ink hover:border-ink-muted/30 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <option value="">Grade</option>
        {(subject === 'LCVP Link Modules' ? LCVP_GRADES : ALL_GRADES).map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <div className="text-right font-medium text-sm tabular-nums min-w-[50px] font-[family-name:var(--font-mono)]">
        {points !== null && (
          <span className="text-ink">
            {points}
            {bonus > 0 && <span className="text-gold text-xs ml-0.5">+{bonus}</span>}
          </span>
        )}
      </div>

      <button
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        className="text-ink-muted/40 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed p-1"
        aria-label="Remove subject"
      >
        <span className="text-lg leading-none">&times;</span>
      </button>
    </div>
  );
}
