/** Pure, dependency-free academic planning calculations. These are estimates, not official records. */
export function calculateAttendance({ held, attended, target }) {
  if (!Number.isInteger(held) || held < 0 || !Number.isInteger(attended) || attended < 0 || attended > held || !Number.isFinite(target) || target < 0 || target > 100) {
    return { valid: false, percentage: null, classesNeeded: null };
  }
  const percentage = held === 0 ? null : (attended / held) * 100;
  const classesNeeded = target === 100
    ? (attended === held ? 0 : null)
    : Math.max(0, Math.ceil((target * held - 100 * attended) / (100 - target)));
  return { valid: true, percentage, classesNeeded };
}

export function calculateSgpa(credits, grades) {
  if (!Array.isArray(credits) || !Array.isArray(grades) || credits.length === 0 || credits.length !== grades.length) return null;
  if (credits.some((credit) => !Number.isFinite(credit) || credit <= 0) || grades.some((grade) => !Number.isFinite(grade) || grade < 0 || grade > 10)) return null;
  const totalCredits = credits.reduce((sum, credit) => sum + credit, 0);
  if (!Number.isFinite(totalCredits) || totalCredits <= 0) return null;
  return grades.reduce((sum, grade, index) => sum + grade * credits[index], 0) / totalCredits;
}
