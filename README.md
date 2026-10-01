# JIIT Toppers

**A student-first workspace for Jaypee Institute of Information Technology.**

JIIT Toppers brings academic discovery, study resources, exam preparation, campus information, career preparation and student collaboration into one coherent experience. It is designed to complement—not replace—the official JIIT student systems.

> **Current status:** V3 foundation work. The website remains a foundation prototype. The Academics workspace includes local attendance and SGPA estimators, but there is no production database, authentication, JIIT student-record integration, or live campus service. Any sample or placeholder content must not be treated as official.

## Product principles

- **Student-first:** organise tools around a student's programme, branch, admission batch and semester.
- **Trust by design:** distinguish official information, reviewed community contributions, unreviewed submissions and demo content.
- **Source-aware:** institutional facts should link to the originating JIIT notice or document and show when they were last checked.
- **Privacy-conscious:** never expose private student records or credentials in public pages, logs or demo data.
- **Complement existing systems:** do not imply access to attendance, grades, fees or other private records unless an authorised integration exists.

## Planned workspaces

| Workspace | Purpose | Current implementation |
| --- | --- | --- |
| Home | Entry point and shortcuts | UI scaffold |
| Academics | Programme, curriculum, courses and academic tools | UI scaffold plus local attendance and SGPA estimators |
| Study Vault | Notes, PYQs, assignments, tutorials and labs | UI scaffold |
| Exam Center | Schedules, preparation and past-paper history | UI scaffold |
| Career | Recruiter information and student experiences | UI scaffold |
| Campus | Sector 62 / Sector 128 information and utilities | UI scaffold |
| Community | Discussions, teams, clubs and events | UI scaffold |

See [the feature map](docs/FEATURE_MAP.md), [V3 foundation status](docs/V3_FOUNDATION.md), and [research and code audit](docs/RESEARCH_AND_CODE_AUDIT_2026-10-01.md) for the implementation plan, audit findings and acceptance criteria.

## Technology

- Next.js App Router and React
- TypeScript
- CSS design system
- Prisma schema targeting PostgreSQL
- GitHub Actions for CI (unit tests, lint, typecheck, Prisma validation and build)

The application currently uses a lightweight client-side prototype. Database, authentication, storage, moderation and external integrations are future implementation work—not active services.

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Available scripts:

- `npm run dev` — local development server
- `npm run test` — dependency-free unit tests for academic calculations
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript checks
- `npm run db:validate` — Prisma schema validation
- `npm run build` — production compilation

## Data and contribution policy

Records should carry a trust state:

- `OFFICIAL` — published by JIIT through an official channel
- `VERIFIED` — independently reviewed against a reliable source
- `COMMUNITY` — student-contributed and not institutionally endorsed
- `DEMO` — illustrative placeholder data, never real student or institutional records

Do not upload private student information, credentials, copyrighted material without permission, or personal contact details. Community submissions need a review and reporting workflow before public launch.

## Roadmap

1. Modularise the prototype and establish quality gates
2. Finalise the domain model and versioned database migrations
3. Implement authentication, profiles and role-safe authorisation
4. Build programme, branch, batch, curriculum and subject records
5. Implement resource upload, storage, review and source attribution
6. Add PYQs, exams, attendance and grade-planning tools
7. Add campus and career directories with freshness/provenance
8. Implement community workflows, moderation and notifications
9. Add contextual search and JIIT Sathi only after source data is trustworthy
10. Complete security, accessibility, performance and deployment verification

## Production readiness

This repository should not be described as production-ready until the database and auth are configured, migrations are applied, access controls are tested, real integrations are verified, and CI/build checks pass in a clean environment.
