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
    <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[1fr_110px_50px_28px] gap-1.5 items-center py-1 border-b border-paper-dark/80 last:border-b-0">
      <select
        value={subject}
        onChange={e => onSubjectChange(index, e.target.value)}
        className="border-0 border-b border-transparent bg-transparent px-0 py-1.5 text-[0.85rem] text-ink truncate hover:border-ink/20 focus:border-ink"
      >
        <option value="">Subject...</option>
        {available.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={grade}
        onChange={e => onGradeChange(index, e.target.value as Grade)}
        disabled={!subject}
        className="border-0 border-b border-transparent bg-transparent px-0 py-1.5 text-[0.85rem] text-ink hover:border-ink/20 focus:border-ink disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <option value="">Grade</option>
        {(subject === 'LCVP Link Modules' ? LCVP_GRADES : ALL_GRADES).map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <div className="text-right font-[family-name:var(--font-mono)] text-[0.8rem] tabular-nums">
        {points !== null && (
          <span className="text-ink">
            {points}
            {bonus > 0 && <span className="text-accent ml-0.5">+{bonus}</span>}
          </span>
        )}
      </div>

      <button
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        className="text-ink-muted/30 hover:text-accent disabled:opacity-0 disabled:cursor-not-allowed p-0 text-center"
        aria-label="Remove subject"
      >
        <span className="text-sm leading-none">&times;</span>
      </button>
    </div>
  );
}
