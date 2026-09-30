# JIIT Toppers

JIIT Toppers is a student-first operating system for Jaypee Institute of Information Technology (JIIT).

## Product

- Academic Explorer
- Study Vault
- PYQs and exam center
- Attendance and SGPA/CGPA tools
- Placement archive
- Sector 62 / Sector 128 campus utilities
- Student community
- JIIT Sathi AI assistant
- Admin and moderation layer

## Architecture

Next.js App Router + TypeScript + Tailwind-compatible CSS architecture + PostgreSQL/Prisma-ready domain model.

The source material used for this build includes JPortal, JIIT Shelf, Muj Toppers, Muj Toppers Material and the existing JIIT Toppers prototype. Legacy projects are treated as reference material; the production app uses one unified architecture.

## Data provenance

Every institutional or community record should eventually be labelled as Official, Verified, Community, or Demo. Unverified demo data must never be presented as official JIIT information.

## Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Roadmap

1. Authentication and student profiles
2. Database-backed academics
3. Attendance / grades / SGPA
4. Study Vault and resource verification
5. Exams and PYQs
6. Campus utilities
7. Placements and career preparation
8. Community and moderation
9. JIIT Sathi
10. Automated tests and production deployment
