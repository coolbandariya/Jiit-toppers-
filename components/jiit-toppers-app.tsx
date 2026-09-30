'use client';

import { useMemo, useState } from 'react';
import { BookOpen, BriefcaseBusiness, Building2, Calculator, CalendarDays, GraduationCap, Library, MapPin, Search, Users } from 'lucide-react';

type Section = 'home'|'academics'|'resources'|'exams'|'placements'|'campus'|'community';

const branches = [
  { id:'CSE', name:'Computer Science & Engineering' },
  { id:'ECM', name:'Electronics & Computer Engineering' },
  { id:'ECE', name:'Electronics & Communication Engineering' },
];
const subjects = [
  {name:'Data Structures & Algorithms',code:'CSE204',branch:'CSE',semester:3},
  {name:'Database Management Systems',code:'CSE205',branch:'CSE',semester:3},
  {name:'Operating Systems',code:'CSE301',branch:'CSE',semester:5},
  {name:'Digital Logic Design',code:'ECM203',branch:'ECM',semester:3},
  {name:'Signals & Systems',code:'ECE204',branch:'ECE',semester:3},
];
const resources = [
  {title:'Data Structures — Unit 1 Notes',subject:'Data Structures & Algorithms',type:'Notes'},
  {title:'DBMS T1 PYQs',subject:'Database Management Systems',type:'PYQ'},
  {title:'Digital Logic Lab Manual',subject:'Digital Logic Design',type:'Lab'},
  {title:'OS End Semester Papers',subject:'Operating Systems',type:'PYQ'},
];
const companies = ['Google','Microsoft','Amazon','Goldman Sachs','JP Morgan Chase','Cisco'];

export function JIITToppersApp() {
  const [section,setSection]=useState<Section>('home');
  const [campus,setCampus]=useState('Sector 62');
  const [branch,setBranch]=useState('ALL');
  const [semester,setSemester]=useState('ALL');
  const [query,setQuery]=useState('');

  const filteredSubjects=useMemo(()=>subjects.filter(s=>(branch==='ALL'||s.branch===branch)&&(semester==='ALL'||String(s.semester)===semester)&&(!query||`${s.name} ${s.code}`.toLowerCase().includes(query.toLowerCase()))),[branch,semester,query]);
  const filteredResources=useMemo(()=>resources.filter(r=>!query||`${r.title} ${r.subject}`.toLowerCase().includes(query.toLowerCase())),[query]);
  const go=(s:Section)=>{setSection(s);window.scrollTo({top:0,behavior:'smooth'});};

  return <div className="jt-shell">
    <header className="jt-topbar"><div className="jt-container jt-nav">
      <button className="jt-brand" onClick={()=>go('home')}><span className="jt-logo">JT</span><span><strong>JIIT TOPPERS</strong><small>Your JIIT, in one place</small></span></button>
      <nav>{(['academics','resources','exams','placements','campus','community'] as Section[]).map(s=><button className={section===s?'active':''} key={s} onClick={()=>go(s)}>{s}</button>)}</nav>
      <label className="jt-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search JIIT"/></label>
    </div></header>

    <main className="jt-container">
      {section==='home' && <section>
        <div className="jt-hero"><div><span className="jt-kicker">JIIT STUDENT OPERATING SYSTEM</span><h1>Your JIIT,<br/><em>in one place.</em></h1><p>Academics, study material, exams, campus utilities, placements and student community — organised around your semester.</p><div className="jt-actions"><button className="jt-primary" onClick={()=>go('academics')}>Explore Academics</button><button className="jt-secondary" onClick={()=>go('resources')}>Open Study Vault</button></div></div><div className="jt-hero-card"><GraduationCap size={34}/><strong>Semester Command Center</strong><span>Attendance · Timetable · Exams · SGPA</span><div className="jt-stat-row"><b>82%<small>Attendance</small></b><b>8.2<small>Current SGPA</small></b><b>03<small>Upcoming Exams</small></b></div></div></div>
        <div className="jt-section-head"><div><span className="jt-kicker">QUICK ACCESS</span><h2>Everything students actually need.</h2></div></div>
        <div className="jt-grid jt-six">{[['Study Vault',BookOpen,'resources'],['Attendance',Calculator,'academics'],['Exams',CalendarDays,'exams'],['Placements',BriefcaseBusiness,'placements'],['Campus',Building2,'campus'],['Community',Users,'community']].map(([name,Icon,target])=><button className="jt-feature" key={name as string} onClick={()=>go(target as Section)}><Icon size={23}/><strong>{name as string}</strong><span>Open workspace <span>→</span></span></button>)}</div>
      </section>}

      {section==='academics' && <section className="jt-page"><span className="jt-kicker">ACADEMICS</span><h1>Academic Explorer</h1><p className="jt-lead">Find your course, plan your semester and keep academic utilities together.</p><div className="jt-filters"><select value={branch} onChange={e=>setBranch(e.target.value)}><option value="ALL">All branches</option>{branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select><select value={semester} onChange={e=>setSemester(e.target.value)}><option value="ALL">All semesters</option>{[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>Semester {n}</option>)}</select></div><div className="jt-grid jt-three">{filteredSubjects.map(s=><article className="jt-card" key={s.code}><span>{s.code}</span><h3>{s.name}</h3><p>{branches.find(b=>b.id===s.branch)?.name} · Semester {s.semester}</p><button onClick={()=>go('resources')}>View resources →</button></article>)}</div></section>}

      {section==='resources' && <section className="jt-page"><span className="jt-kicker">STUDY VAULT</span><h1>Study smarter.</h1><p className="jt-lead">Notes, PYQs, lab material and exam resources organised by subject.</p><div className="jt-grid jt-two">{filteredResources.map(r=><article className="jt-resource" key={r.title}><span className="jt-pill">{r.type}</span><h3>{r.title}</h3><p>{r.subject}</p><button>Open resource →</button></article>)}</div></section>}

      {section==='exams' && <section className="jt-page"><span className="jt-kicker">EXAM CENTER</span><h1>Prepare with context.</h1><div className="jt-grid jt-three"><article className="jt-card"><CalendarDays/><h3>Upcoming Exams</h3><p>Keep T1, T2, T3 and end-sem schedules in one view.</p></article><article className="jt-card"><BookOpen/><h3>PYQ History</h3><p>Track when questions and topics actually appeared.</p></article><article className="jt-card"><Calculator/><h3>Grade Planner</h3><p>Model marks and target grades without pretending predictions are official.</p></article></div></section>}

      {section==='placements' && <section className="jt-page"><span className="jt-kicker">CAREER</span><h1>Placement Archive</h1><p className="jt-lead">Companies, interview experiences, OA preparation and career resources.</p><div className="jt-grid jt-three">{companies.map(c=><article className="jt-card" key={c}><BriefcaseBusiness/><h3>{c}</h3><p>Company profile, eligibility, preparation topics and verified student experiences.</p><button>Explore company →</button></article>)}</div></section>}

      {section==='campus' && <section className="jt-page"><span className="jt-kicker">CAMPUS</span><h1>Know your campus.</h1><div className="jt-campus-toggle"><button className={campus==='Sector 62'?'active':''} onClick={()=>setCampus('Sector 62')}>Sector 62</button><button className={campus==='Sector 128'?'active':''} onClick={()=>setCampus('Sector 128')}>Sector 128</button></div><div className="jt-grid jt-three">{[['Shuttle',MapPin,'Campus-to-campus routes and stops'],['Library',Library,'LRC resources and study spaces'],['Facilities',Building2,'Facilities, rooms and campus utilities']].map(([n,I,d])=><article className="jt-card" key={n as string}><I/><h3>{n as string}</h3><p>{d as string}</p><small>Selected campus: {campus}</small></article>)}</div></section>}

      {section==='community' && <section className="jt-page"><span className="jt-kicker">COMMUNITY</span><h1>Students helping students.</h1><p className="jt-lead">Teams, discussions, clubs, events, marketplace and lost & found — with moderation built in.</p><div className="jt-grid jt-three">{['Team Finder','Discussions','Clubs & Events','Marketplace','Lost & Found','Peer Lounge'].map(x=><article className="jt-card" key={x}><Users/><h3>{x}</h3><p>Community content should be clearly labelled and moderated before being treated as verified.</p></article>)}</div></section>}
    </main>
    <footer className="jt-footer"><div className="jt-container"><strong>JIIT TOPPERS</strong><span>Built for JIIT students. Official information stays linked to its source.</span></div></footer>
  </div>;
}
