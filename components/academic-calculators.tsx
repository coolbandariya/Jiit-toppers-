'use client';

import { useMemo, useState } from 'react';
import { calculateAttendance, calculateSgpa } from '../lib/academic-calculations.mjs';

export function AcademicCalculators() {
  const [held, setHeld] = useState('0');
  const [attended, setAttended] = useState('0');
  const [target, setTarget] = useState('75');
  const [credits, setCredits] = useState('4,3,3,2');
  const [grades, setGrades] = useState('9,8,8,10');
  const attendance = useMemo(
    () => calculateAttendance({ held: held.trim() === '' ? Number.NaN : Number(held), attended: attended.trim() === '' ? Number.NaN : Number(attended), target: target.trim() === '' ? Number.NaN : Number(target) }),
    [held, attended, target],
  );
  const sgpa = useMemo(() => {
    if (!credits.trim() || !grades.trim()) return null;
    return calculateSgpa(
      credits.split(',').map(value => Number(value.trim())),
      grades.split(',').map(value => Number(value.trim())),
    );
  }, [credits, grades]);
  return <section className="jt-calculators" aria-labelledby="academic-tools-title">
    <span className="jt-kicker">PERSONAL PLANNING TOOLS</span><h2 id="academic-tools-title">Academic calculators</h2>
    <p className="jt-lead">Use your own inputs to explore scenarios. These tools are not connected to JIIT records and do not represent official attendance or grades.</p>
    <div className="jt-grid jt-two">
      <article className="jt-card"><h3>Attendance planner</h3><p>Estimate consecutive classes needed to reach your target.</p>
        <div className="jt-form-grid"><label>Classes held<input type="number" min="0" step="1" value={held} onChange={e => setHeld(e.target.value)} /></label><label>Classes attended<input type="number" min="0" step="1" value={attended} onChange={e => setAttended(e.target.value)} /></label><label>Target (%)<input type="number" min="0" max="100" value={target} onChange={e => setTarget(e.target.value)} /></label></div>
        <p className="jt-result" aria-live="polite">{!attendance.valid ? 'Enter whole-number class counts and a target from 0 to 100.' : attendance.percentage === null ? 'Enter classes held to calculate attendance.' : 'Current attendance: ' + attendance.percentage.toFixed(1) + '%'}</p>
        {attendance.valid && attendance.percentage !== null && <p>{attendance.classesNeeded === null ? 'A 100% target requires attending every future class.' : attendance.classesNeeded === 0 ? 'You currently meet your target.' : 'Attend the next ' + attendance.classesNeeded + ' consecutive classes to reach your target.'}</p>}
        {!attendance.valid && <p role="alert">Check that attended classes do not exceed classes held and all values are valid.</p>}
      </article>
      <article className="jt-card"><h3>SGPA estimator</h3><p>Enter comma-separated credits and matching grade points.</p>
        <div className="jt-form-grid"><label>Course credits<input value={credits} onChange={e => setCredits(e.target.value)} /></label><label>Grade points<input value={grades} onChange={e => setGrades(e.target.value)} /></label></div>
        <small>Example: 4,3,3,2 and 9,8,8,10</small><p className="jt-result" aria-live="polite">{sgpa === null ? 'Enter matching positive credits and grade points from 0 to 10.' : 'Estimated SGPA: ' + sgpa.toFixed(2)}</p>
      </article>
    </div>
  </section>;
}
