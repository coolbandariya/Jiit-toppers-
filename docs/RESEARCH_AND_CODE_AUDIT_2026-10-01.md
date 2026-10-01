# Repository and product audit

Audit date: 2026-10-01  
Repository: `coolbandariya/Jiit-toppers-`  
Scope: default-branch source snapshot, Prisma schema/migrations, Supabase project metadata, official JIIT web resources, and publicly discoverable student-built tools.

This is a source and architecture audit. It is not a claim that every line has been executed locally or that the deployed site has passed end-to-end testing.

## Executive summary

The repository is a Next.js 16 / React 19 / TypeScript client-side prototype with an extensive Prisma domain schema and local academic calculators. Its core workspaces are largely descriptive scaffolding. Supabase now contains the initial schema and RLS is enabled on all 15 public tables. No policies are present, so Data API access is denied by default; this is a safe interim posture, not a completed authorization design. The database is empty.

## Source review

### Application shell — `components/jiit-toppers-app.tsx`
- Keeps active section and search query in local React state.
- Delegates the header, home and workspace rendering to separate components.
- Navigation does not update the URL; deep links and browser history are absent.
- The client component wraps the whole experience; server-rendered data and route-level loading are not yet part of the architecture.
- Recommendation: use URL-backed section state, preserve browser history, and keep the shell free of domain/data logic.

### Home — `components/jt-home.tsx`
- Six shortcuts route to existing sections.
- Hero content is static and no live student-specific summary is shown.
- Recommendation: add real timetable, exam, saved-resource and announcement summaries only after those data sources exist; use explicit empty states rather than fabricated metrics.

### Navigation — `components/jt-navigation.tsx`
- Desktop navigation and a controlled search input are present.
- Search is not a global data search; mobile menu, clear action, keyboard interaction and query destination need verification/implementation.
- Recommendation: implement accessible mobile navigation and a real search route/API after the data layer is ready.

### Workspace — `components/jt-workspace.tsx`
- Six workspaces are represented by a static description map.
- Search filters only the title/body of those static cards.
- The Academics workspace embeds the calculators; the other workspaces are not complete data workflows.
- Recommendation: split each workspace into independently testable modules and introduce shared loading, error, empty and trust/provenance components.

### Academic calculators — `components/academic-calculators.tsx`, `lib/academic-calculations.mjs`
- Attendance and weighted SGPA calculations are local and dependency-free.
- UI clearly disclaims connection to official records.
- The SGPA estimator accepts any positive decimal credits and 0–10 grade points; institutional grading rules must be verified before describing it as JIIT-specific.
- Attendance edge cases, including zero classes and a 100% target, need clear explanatory UX and tests.
- Existing unit tests cover calculation functions, but no browser-level tests are present.

### Validation — `lib/validation/resource.ts`
- Zod validates resource metadata and restricts source URLs to HTTP(S).
- Validation alone does not establish authentication, ownership, storage safety, malware scanning, or moderation.
- Server handlers must derive uploader identity from a verified session, not submitted JSON.

### Health endpoint — `app/api/health/route.ts`
- Returns no-store responses and distinguishes missing/unavailable database configuration.
- Does not leak connection details.
- It checks database reachability only; it is not a full readiness check for auth, storage or other dependencies.

### Prisma schema — `prisma/schema.prisma`
- Models cover users, campuses, branches, curricula, subjects, resources, exams, companies, placement experiences, announcements, campus events, discussions, replies and audit events.
- Trust provenance and publication/moderation status are separate concepts, which should be preserved.
- Added indexes for six foreign-key paths flagged by Supabase's performance advisor.
- The current model does not include a timetable, personal attendance ledger, saved resources, upload reports, moderation queue state history, notification preferences or source publisher metadata. Add these only with explicit product and privacy requirements.
- User role is a database field; application code must prevent self-service elevation.

### Database and migrations
- Initial migration creates the current domain tables, enums, constraints and indexes.
- RLS migration has been applied to all 15 tables.
- A further migration adds indexes for foreign keys flagged by the performance advisor.
- Prisma migration provider lock is committed.
- Supabase reports 15 tables with RLS enabled and zero rows.
- RLS is enabled with no policies. This blocks ordinary Data API access by default. Do not add permissive policies until each table's public/private data classification and CRUD permissions are specified and tested.
- Validate migration history against the repository before using `prisma migrate deploy`; do not use `db push` as a production migration strategy.

### CI and dependency management
- CI currently runs tests, lint, typecheck, Prisma validation and build.
- A committed lockfile and `npm ci` reproducibility are still needed.
- CI status and a clean local production build have not been verified in this audit.

## Supabase status verified 2026-10-01

- Project: `Jiit-toppers-` (`ofqxnjbyyenxhzotwhhh`)
- Region: `ap-northeast-1`
- PostgreSQL: 17.11
- Tables: 15, all with RLS enabled
- Rows: 0
- Migrations recorded: initial schema, enable RLS, foreign-key indexes
- Security advisor: RLS-enabled/no-policy informational findings remain. These are expected for the deny-by-default interim state and must be resolved by a deliberate policy design before direct client access.
- Performance advisor: six unindexed foreign keys were addressed with a migration. Unused-index notices are expected on an empty/new database and should be reassessed after representative traffic.

## Product research and reference landscape

Official JIIT sources should be the authority for institutional claims:
- JIIT official website and latest announcements: https://www.jiit.ac.in/latest-announcements
- Student portal: https://webkiosk.jiit.ac.in/
- Learning Resource Centre: https://lp.jiit.ac.in/lrcjiit/

Publicly discoverable student-built references include:
- JPortal: https://github.com/codeblech/jportal
- JIIT timetable website: https://github.com/tashifkhan/JIIT-time-table-website
- JIIT campus updates: https://github.com/tashifkhan/JIIT-campus-updates
- Timetable parser: https://github.com/entropyconquers/jiit-timetable-parser

These demonstrate student workflows such as timetable access, portal convenience and campus updates. Their code, data, branding and content should not be copied without checking licences and permissions.

### JIIT Pulse — live reference inspected 2026-10-01

The user supplied a Google share link resolving to https://jiit-pulse.vercel.app/. The live site was opened in a browser session. The landing page identifies itself as JIITPulse and describes attendance, schedules and mess menus for Sector 62 and Sector 128. It displays a hostel Wi-Fi notice advising mobile data where campus Wi-Fi may be restricted.

The site map exposed these paths: /, /62, /128 and /community. The browser inspection reached the campus timetable interfaces; the plain scraper rendered the client-side landing content for the deep links, so page-level observations below are from the interactive browser inspection rather than assuming the static scrape was complete.

Observed shared timetable features:
- Header actions: Support, Report Error, Settings and Profile.
- Live-status panel with day-state/time.
- Day selector for Sunday through Saturday.
- Programme selectors, semester selectors and a batch dropdown.
- Feed/grid view toggle.
- Calendar action described as syncing to Apple or Google Calendar.
- Timetable entries show time range, class type, subject, room and instructor; some entries show a shared batch.
- Assignments card described as tracking deadlines and progress.
- Bottom icon navigation, a standalone JIIT Pulse Community link and a floating “Open Pulse AI” action.

Observed campus differences:
- Sector 62 exposes a wider programme selector in the inspected state (B.Tech, M.Tech, BCA, BSc, BBA, B.Com, MBA, M.Com, MADBM, MCA and MSc) and semester choices 1, 3, 5 and 7. The inspected default batch was A1; the dropdown included multiple A/B/C/D/G/H batches. A sample Wednesday schedule displayed English, Basic Electronics, lunch, an English lab and Software Development Fundamentals-I.
- Sector 128 exposed B.Tech, BCA and MCA in the inspected state, semester 1 and 3, and an Upload Timetable action. The inspected default batch was E1, with numerous E/F batches available. A sample Wednesday schedule displayed Physics-1, an English lab, lunch, English, Software Development Fundamentals-I and a Mathematics-1 tutorial.
- The displayed timetable “Last Updated” value varied between observed renders (4 September 2026 and 14 September 2026). This should be treated as a freshness/consistency question, not as proof that the data is current.
- The inspected sample schedules are UI content and should not be imported into JIIT Toppers as authoritative timetable data without source, permission and currentness checks.

Browser inspection exposed no visible application error in the sampled campus views. This is not a full functional, security, accessibility or reliability test; button actions such as upload, calendar sync, profile, support and AI were not exhaustively exercised.

#### Product implications for JIIT Toppers

JIIT Pulse establishes a concrete student workflow reference: campus selection → day/programme/semester/batch filters → timetable feed/grid → calendar action, with adjacent assignments, reporting, profile and AI entry points.

JIIT Toppers should use this as a workflow benchmark, not copy its branding or assume access to its underlying data. Specific opportunities:
1. Make campus (62/128), programme, semester, batch and weekday first-class timetable dimensions.
2. Support both feed and grid views and accessible class-detail panels.
3. Treat timetable upload as a contribution workflow with file validation, provenance, versioning, review and rollback—not as an unverified overwrite.
4. Provide calendar export only from a selected, validated timetable and clearly identify timezone and update version.
5. Show a visible “last checked/updated” timestamp and warn when data is stale or source provenance is missing.
6. Keep assignment tracking separate from institutional assignment systems unless an authorised integration exists.
7. Make report-error, profile, settings and AI actions real and permission-aware before presenting them as available features.
8. Keep any AI answers grounded in source-linked, access-filtered data; never imply that a floating AI button means the assistant has reliable campus data.

The exact live site is now identified and its visible workflow has been inspected. The above does not establish its backend design, data licence, security posture or the correctness of the displayed schedule.

## Product recommendations

1. Finish secure auth/profile provisioning and a tested server-side data-access layer.
2. Define table-by-table data classification and RLS policies before exposing the Supabase Data API.
3. Build a complete Study Vault lifecycle: submit metadata, upload privately, review, publish, report and remove.
4. Implement timetable ingestion with source, academic year, batch, version and validation; do not scrape or redistribute private portal data without authorisation.
5. Keep attendance and grade tools as user-input planning tools unless an approved institutional integration exists.
6. Add source-aware official announcements and campus information with checked-at dates.
7. Build placement and community submissions with moderation, reporting and privacy controls.
8. Add integration and end-to-end tests, dependency locking, accessibility checks, performance checks and deployment verification.
9. Add AI only after retrieval sources are trustworthy, permission-filtered and cited in answers.

## Acceptance gates for production

- Clean install from committed lockfile.
- CI passes on the exact release commit.
- Prisma schema and migration history are consistent.
- Auth and authorization tests prove unauthenticated users cannot write and students cannot elevate roles or modify another user's records.
- RLS policy tests cover every exposed table and role.
- Uploads use private storage, strict file validation, limits and moderation.
- No fabricated personal records or unlicensed materials are presented as real.
- Mobile, keyboard and screen-reader flows are checked.
- Production deployment, health endpoint and rollback procedure are verified.

## Current verdict

The project has a useful foundation and a live database schema, but it is not production-ready. Authentication, application data workflows, explicit RLS policies, reproducible dependency installation and deployment verification remain release blockers.
