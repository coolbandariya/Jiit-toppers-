export type AttendanceResult = { valid: boolean; percentage: number | null; classesNeeded: number | null };
export function calculateAttendance(input: { held: number; attended: number; target: number }): AttendanceResult;
export function calculateSgpa(credits: number[], grades: number[]): number | null;
