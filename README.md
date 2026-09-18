# Enterprise Management

A dashboard for a small business owner and manager to track revenue, expenses, and get AI-generated insights on how the shop is doing.

## Stack
- Next.js 14 (App Router) — frontend + backend in one project
- Prisma + PostgreSQL — data layer
- Tailwind CSS — styling
- Anthropic API (Claude) — AI insights and Q&A
- NextAuth — authentication (owner/manager roles)

## Pages
- `/dashboard` — monthly summary metrics
- `/transactions` — income/expense log
- `/revenue-by-person` — monthly + yearly totals per team member
- `/ai-insights` — ask questions in plain language, view auto-generated insights

## Getting started

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the environment file and fill in your values:
   ```
   cp .env.example .env
   ```
   - `DATABASE_URL` — a Postgres connection string (Supabase, Neon, or Railway all work)
   - `ANTHROPIC_API_KEY` — from console.anthropic.com
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`

3. Push the schema to your database:
   ```
   npx prisma migrate dev --name init
   ```

4. Run the dev server:
   ```
   npm run dev
   ```
   Visit http://localhost:3000
