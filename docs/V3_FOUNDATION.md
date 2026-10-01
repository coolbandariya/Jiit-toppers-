# V3 Foundation: implementation status

## Delivered in this upgrade

- Split the former all-in-one client component into navigation, home and workspace components.
- Removed illustrative attendance, SGPA and exam-count figures that could be mistaken for real student data.
- Replaced hard-coded sample course, resource and recruiter records in the visible prototype with explicit workspace scaffolding.
- Added accessible labels/current-page state to primary navigation.
- Updated the README to distinguish implemented UI from planned services.

## Not yet implemented

- Database connection, schema migrations and seed strategy
- Sign-in, session handling, profile onboarding and role-based access
- Live JIIT curriculum, timetable, announcements or student records
- Resource upload, object storage, malware scanning, moderation and takedown
- Attendance/grade integrations or verified calculation inputs
- Campus data ingestion and freshness monitoring
- Placement record verification and community moderation
- Search indexing, notifications and AI/RAG
- End-to-end tests, security review and deployment verification

## Required acceptance gates

### Application foundation
- A clean install and production build succeed from a committed lockfile.
- ESLint and TypeScript checks run in CI.
- Components remain focused; data access is not embedded in presentation components.
- Loading, empty, error and unavailable states are designed for every data-backed route.

### Data and trust
- Every externally sourced record has a source URL, source type and checked/published timestamp where applicable.
- Community submissions are never styled or described as official.
- Demo fixtures are isolated from production data and visibly labelled.
- Curriculum records are scoped by programme, branch, admission batch and curriculum version.

### Security and privacy
- All private records are protected by server-side authorization and database row-level policies.
- User-controlled input is validated at the boundary.
- Uploads use private storage by default and short-lived access URLs.
- Secrets are server-only; no service-role key is shipped to the browser.
- Audit events are recorded for privileged changes.

### Release
- CI passes on a clean checkout.
- Migration deployment is tested against a staging database.
- Production environment variables and rollback procedures are documented.
- Accessibility, mobile layout, performance and error monitoring are checked before launch.

## Architecture direction

Keep route components thin. Prefer server components for data fetching and static composition; isolate browser state and event handlers in small client components. Put domain types and validation in `lib/`, data access behind server-only modules, and schema changes in committed migrations. This follows the Next.js App Router's server/client component model.

## Next implementation slice

1. Add a reproducible package lock and enforce `npm ci` in CI.
2. Validate lint and build in a clean environment.
3. Finalise the database schema and initial migration before wiring UI to live records.
4. Add authentication and authorization before storing personal or private student data.
