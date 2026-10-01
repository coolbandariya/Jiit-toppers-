'use client';

import { useMemo, useState } from 'react';

export function AcademicCalculators() {
  const [held, setHeld] = useState('0');
  const [attended, setAttended] = useState('0');
  const [target, setTarget] = useState('75');
  const [credits, setCredits] = useState('4,3,3,2');
  const [grades, setGrades] = useState('9,8,8,10');
  const attendance = useMemo(() => {
    const total = Number(held);
    const present = Number(attended);
    const goal = Number(target);
    const valid = held.trim() !== '' && attended.trim() !== '' && target.trim() !== ''
      && Number.isInteger(total) && total >= 0
      && Number.isInteger(present) && present >= 0 && present <= total
      && Number.isFinite(goal) && goal >= 0 && goal <= 100;
    if (!valid) return { pct: null, needed: null, invalid: true };
    const pct = total > 0 ? present / total * 100 : null;
    const needed = goal === 100
      ? (present === total ? 0 : null)
      : Math.max(0, Math.ceil((goal * total - 100 * present) / (100 - goal)));
    return { pct, needed, invalid: false };
  }, [held, attended, target]);
  const sgpa = useMemo(() => {
    if (!credits.trim() || !grades.trim()) return null;
    const c = credits.split(',').map(v => Number(v.trim()));
    const g = grades.split(',').map(v => Number(v.trim()));
    if (c.length === 0 || c.length !== g.length
      || c.some(v => !Number.isFinite(v) || v <= 0)
      || g.some(v => !Number.isFinite(v) || v < 0 || v > 10)) return null;
    return g.reduce((sum, grade, i) => sum + grade * c[i], 0) / c.reduce((sum, v) => sum + v, 0);
  }, [credits, grades]);
  return <section className="jt-calculators" aria-labelledby="academic-tools-title">
    <span className="jt-kicker">PERSONAL PLANNING TOOLS</span><h2 id="academic-tools-title">Academic calculators</h2>
    <p className="jt-lead">Use your own inputs to explore scenarios. These tools are not connected to JIIT records and do not represent official attendance or grades.</p>
    <div className="jt-grid jt-two">
      <article className="jt-card"><h3>Attendance planner</h3><p>Estimate consecutive classes needed to reach your target.</p>
        <div className="jt-form-grid"><label>Classes held<input type="number" min="0" step="1" value={held} onChange={e => setHeld(e.target.value)} /></label><label>Classes attended<input type="number" min="0" step="1" value={attended} onChange={e => setAttended(e.target.value)} /></label><label>Target (%)<input type="number" min="0" max="100" value={target} onChange={e => setTarget(e.target.value)} /></label></div>
        <p className="jt-result" aria-live="polite">{attendance.invalid ? 'Enter whole-number class counts and a target from 0 to 100.' : attendance.pct === null ? 'Enter classes held to calculate attendance.' : 'Current attendance: ' + attendance.pct.toFixed(1) + '%'}</p>
        {!attendance.invalid && attendance.pct !== null && <p>{attendance.needed === null ? 'A 100% target requires attending every future class.' : attendance.needed === 0 ? 'You currently meet your target.' : 'Attend the next ' + attendance.needed + ' consecutive classes to reach your target.'}</p>}
        {attendance.invalid && <p role="alert">Check that attended classes do not exceed classes held and all values are valid.</p>}
      </article>
      <article className="jt-card"><h3>SGPA estimator</h3><p>Enter comma-separated credits and matching grade points.</p>
        <div className="jt-form-grid"><label>Course credits<input value={credits} onChange={e => setCredits(e.target.value)} /></label><label>Grade points<input value={grades} onChange={e => setGrades(e.target.value)} /></label></div>
        <small>Example: 4,3,3,2 and 9,8,8,10</small><p className="jt-result" aria-live="polite">{sgpa === null ? 'Enter matching positive credits and grade points from 0 to 10.' : 'Estimated SGPA: ' + sgpa.toFixed(2)}</p>
      </article>
    </div>
  </section>;
}
