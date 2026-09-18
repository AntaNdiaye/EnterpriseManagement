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

## Current state

The dashboard, transactions, and revenue-by-person pages currently render with sample data so you can see the UI before the database is wired up. Each page has a comment showing the Prisma query that should replace the sample data once you're logging real transactions. The AI insights page is already live — `/api/ai/insight` calls the Anthropic API directly, using a placeholder data summary that should be replaced with a real query for the signed-in business.

Not yet built: authentication/role gating (NextAuth is installed but not configured), the "add transaction" form's submit handler, and the nightly job for proactive AI insights.

## Deploying

1. Push this repo to GitHub.
2. Create a Postgres database (Supabase or Neon free tier is enough to start).
3. Import the repo into Vercel, add the same environment variables from `.env` in the Vercel project settings.
4. Add a Vercel "Build Command" override if needed: `prisma generate && next build`.
5. Deploy. Vercel gives you a live URL and free HTTPS automatically.
