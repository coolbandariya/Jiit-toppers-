'use client';

import { Search } from 'lucide-react';

export type Section = 'home' | 'academics' | 'resources' | 'exams' | 'placements' | 'campus' | 'community';

const sections: Section[] = ['academics', 'resources', 'exams', 'placements', 'campus', 'community'];

export function JTNavigation({ section, query, onNavigate, onQueryChange }: {
  section: Section;
  query: string;
  onNavigate: (section: Section) => void;
  onQueryChange: (query: string) => void;
}) {
  return <header className="jt-topbar"><div className="jt-container jt-nav">
    <button className="jt-brand" onClick={() => onNavigate('home')} aria-label="JIIT Toppers home">
      <span className="jt-logo">JT</span><span><strong>JIIT TOPPERS</strong><small>Your JIIT, in one place</small></span>
    </button>
    <nav aria-label="Main navigation">{sections.map(item => <button key={item} className={section === item ? 'active' : ''} aria-current={section === item ? 'page' : undefined} onClick={() => onNavigate(item)}>{item}</button>)}</nav>
    <label className="jt-search"><Search size={17} aria-hidden="true"/><input value={query} onChange={event => onQueryChange(event.target.value)} placeholder="Search JIIT" aria-label="Search JIIT Toppers"/></label>
  </div></header>;
}
