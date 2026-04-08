// LC Points Scale (2017 onwards)
// Higher Level: H1-H8, Ordinary Level: O1-O8
// LCVP Link Modules: Distinction, Merit, Pass

export type Grade = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'H7' | 'H8'
  | 'O1' | 'O2' | 'O3' | 'O4' | 'O5' | 'O6' | 'O7' | 'O8'
  | 'Distinction' | 'Merit' | 'Pass' | '';

export const POINTS_MAP: Record<Exclude<Grade, ''>, number> = {
  H1: 100, H2: 88, H3: 77, H4: 66, H5: 56, H6: 46, H7: 37, H8: 0,
  O1: 56,  O2: 46, O3: 37, O4: 28, O5: 20, O6: 12, O7: 0,  O8: 0,
  Distinction: 66, Merit: 46, Pass: 28,
};

export const HIGHER_GRADES: Grade[] = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'];
export const ORDINARY_GRADES: Grade[] = ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'];
export const LCVP_GRADES: Grade[] = ['Distinction', 'Merit', 'Pass'];
export const ALL_GRADES: Grade[] = [...HIGHER_GRADES, ...ORDINARY_GRADES];

// Bonus: +25 points for Higher Level Maths if grade is H6 or above
export const MATHS_BONUS_GRADES: Grade[] = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
export const MATHS_BONUS = 25;

export function getPoints(grade: Grade): number {
  if (grade === '') return 0;
  return POINTS_MAP[grade];
}

export function hasMathsBonus(grade: Grade): boolean {
  return MATHS_BONUS_GRADES.includes(grade);
}

export interface SubjectEntry {
  subject: string;
  grade: Grade;
}

export function calculateTotal(entries: SubjectEntry[]): {
  total: number;
  mathsBonus: boolean;
  breakdown: { subject: string; grade: Grade; points: number; bonus: number }[];
} {
  const scored = entries
    .filter(e => e.grade !== '')
    .map(e => {
      const points = getPoints(e.grade);
      const bonus = e.subject === 'Mathematics' && hasMathsBonus(e.grade) ? MATHS_BONUS : 0;
      return { subject: e.subject, grade: e.grade, points, bonus, totalPoints: points + bonus };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);

  // Best 6 subjects count
  const best6 = scored.slice(0, 6);
  const total = best6.reduce((sum, e) => sum + e.totalPoints, 0);
  const mathsBonus = best6.some(e => e.bonus > 0);

  return {
    total,
    mathsBonus,
    breakdown: best6.map(({ subject, grade, points, bonus }) => ({ subject, grade, points, bonus })),
  };
}
