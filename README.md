# RonReed.com

Personal website and portfolio for Ron Reed.

## Stack

| Layer    | Tech                         |
|----------|------------------------------|
| Frontend | Next.js 16, Tailwind CSS     |
| CMS      | Strapi v5 (self-hosted)      |
| Database | SQLite (dev) / PostgreSQL (prod) |

## Project structure

```
.
├── backend/    # Strapi CMS — content management + REST API
└── frontend/   # Next.js — public-facing website
```

## Getting started

### 1. Start the Strapi backend

```bash
cd backend
npm run develop
```

Strapi runs on http://localhost:1337. On first run it will prompt you to create an admin account.

After creating your admin, go to **Settings → Users & Permissions → Roles → Public** and enable `find`/`findOne` for all resume content types (Profile, Experience, Education, Skill, Project, Social).

### 2. Add your content

Use the Strapi admin at http://localhost:1337/admin to populate:

- **Profile** — name, title, bio, contact info (single entry)
- **Experiences** — work history entries
- **Educations** — education history entries
- **Skills** — skills grouped by category
- **Projects** — portfolio projects
- **Socials** — social media links

### 3. Start the Next.js frontend

```bash
cd frontend
cp .env.local.example .env.local
npm run dev
```

The site runs on http://localhost:3000.

## Content types

| Type       | Kind       | Key fields                                        |
|------------|------------|---------------------------------------------------|
| Profile    | Single     | fullName, title, bio, email, phone, location, avatar |
| Experience | Collection | role, company, startDate, endDate, isCurrent, description, skills |
| Education  | Collection | institution, degree, field, startDate, endDate   |
| Skill      | Collection | name, category, level                             |
| Project    | Collection | title, description, technologies, liveUrl, repoUrl, featured, image |
| Social     | Collection | platform, url, handle                             |
