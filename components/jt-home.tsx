import { BookOpen, BriefcaseBusiness, Building2, CalendarDays, Calculator, GraduationCap, Users } from 'lucide-react';
import type { Section } from './jt-navigation';

const shortcuts: { name: string; icon: typeof BookOpen; target: Section; description: string }[] = [
  { name: 'Study Vault', icon: BookOpen, target: 'resources', description: 'Notes, papers and learning material' },
  { name: 'Academic tools', icon: Calculator, target: 'academics', description: 'Plan your semester and grades' },
  { name: 'Exam Center', icon: CalendarDays, target: 'exams', description: 'Schedules and preparation' },
  { name: 'Career', icon: BriefcaseBusiness, target: 'placements', description: 'Placement resources and experiences' },
  { name: 'Campus', icon: Building2, target: 'campus', description: 'Campus information and utilities' },
  { name: 'Community', icon: Users, target: 'community', description: 'Student-led spaces and events' },
];

export function JTHome({ onNavigate }: { onNavigate: (section: Section) => void }) {
  return <section>
    <div className="jt-hero"><div><span className="jt-kicker">JIIT STUDENT WORKSPACE</span><h1>Your JIIT,<br/><em>in one place.</em></h1><p>Academics, study material, exams, campus utilities, placements and student community — organised around your semester.</p><div className="jt-actions"><button className="jt-primary" onClick={() => onNavigate('academics')}>Explore Academics</button><button className="jt-secondary" onClick={() => onNavigate('resources')}>Open Study Vault</button></div></div>
      <div className="jt-hero-card"><GraduationCap size={34}/><strong>Semester Command Center</strong><span>Bring your courses, resources and plans together.</span><div className="jt-stat-row"><b>01<small>Choose a semester</small></b><b>02<small>Find resources</small></b><b>03<small>Plan ahead</small></b></div></div>
    </div>
    <div className="jt-section-head"><div><span className="jt-kicker">QUICK ACCESS</span><h2>Everything students need, connected.</h2></div></div>
    <div className="jt-grid jt-six">{shortcuts.map(({name, icon: Icon, target, description}) => <button className="jt-feature" key={name} onClick={() => onNavigate(target)}><Icon size={23}/><strong>{name}</strong><span>{description} <span aria-hidden="true">→</span></span></button>)}</div>
  </section>;
}
