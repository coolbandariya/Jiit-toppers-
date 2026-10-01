# Data model and service boundary

The Prisma schema is the application domain model. It is not a live database until a PostgreSQL instance is configured and migrations are applied.

## Core relationships

- A branch has multiple curriculum versions.
- A curriculum is scoped to a branch, admission year and version.
- A curriculum links subjects to a semester through `CurriculumSubject`.
- Resources can be associated with subjects and campuses, and record uploader/reviewer relationships.
- Exams can be associated with a subject and retain source/trust metadata.
- Announcements and campus events can be scoped to a campus.
- Discussions have replies; privileged actions can be represented in `AuditEvent`.

## Trust and publication

`DataTrust` describes provenance, not publication permission. `ResourceStatus` and `AnnouncementStatus` control moderation/publication state. A community submission must not become official merely because it has been reviewed; official attribution requires an official source.

## Service boundaries

- `lib/prisma.ts`: server-only Prisma client singleton.
- `lib/validation/`: request-boundary schemas. Never trust browser-provided IDs, role fields or ownership.
- `app/api/health/route.ts`: minimal dependency health check. It reports only whether the database is configured and reachable; it does not expose connection details.

## Before enabling writes

1. Add a committed Prisma migration generated from the reviewed schema.
2. Configure a managed PostgreSQL database and apply migrations in staging.
3. Add authentication and enforce ownership/role checks on the server.
4. Add database-level row policies if the application uses Supabase directly.
5. Add upload scanning, private storage and moderation before accepting files.
6. Add tests for authorization, validation, and moderation transitions.
