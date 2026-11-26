# 🚀 Cloudflare Frontend & Supabase Backend Deployment Guide

This guide walks you through deploying **100x MINDS**:
- **Frontend & Edge API Handlers**: Deployed on **Cloudflare** using `@opennextjs/cloudflare` and `wrangler`.
- **Backend, Database & Storage**: Powered by **Supabase** (PostgreSQL, Row-Level Security, Storage Buckets).

---

## 🏗️ Architecture Summary

```
                       ┌───────────────────────────────┐
                       │        Cloudflare Edge        │
                       │    (CDN + Workers Runtime)    │
                       └──────────────┬────────────────┘
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
     Static Assets & UI Pages                      Edge API Handlers
  (/, /services, /blog, /casestudy)           (/api/contact, /api/auth,
                                                /api/dashboard/*)
                                                             │
                                                             ▼ (Encrypted HTTPS)
                                               ┌───────────────────────────────┐
                                               │       Supabase Backend        │
                                               │  • PostgreSQL DB              │
                                               │  • Storage Buckets            │
                                               │  • Row-Level Security (RLS)   │
                                               └───────────────────────────────┘
```

---

## ⚡ STEP 1: Set Up Supabase Backend

### 1. Create a Supabase Project
1. Log in to [Supabase Dashboard](https://supabase.com/dashboard) or visit [database.new](https://database.new).
2. Click **New Project**, select your organization, choose a region close to your users, and set a database password.

### 2. Run the Database Schema Migration
1. In your Supabase project dashboard, navigate to the **SQL Editor** (icon `>_` in the left sidebar).
2. Click **New Query**.
3. Copy and paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql).
4. Click **Run** (or `Ctrl+Enter`).
5. This automatically configures:
   - `contact_inquiries` table (stores inquiries and architecture audit requests)
   - `newsletter_subscribers` table (stores newsletter signups)
   - `case_studies` table (stores published and draft case studies)
   - `blogs` table (stores published and draft articles)
   - Performance indexes on emails, slugs, and timestamps
   - Automated `updated_at` triggers
   - Row-Level Security (RLS) policies allowing public insertions/reads where appropriate, while restricting admin mutations to the service role
   - Storage buckets (`casestudies` and `blogs`) with public read access

### 3. Copy Your Supabase API Credentials
Navigate to **Project Settings** -> **API**:
- **Project URL**: (e.g. `https://xyzcompany.supabase.co`) -> `NEXT_PUBLIC_SUPABASE_URL`
- **anon / public key**: (starts with `eyJ...`) -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role secret key**: (starts with `eyJ...`) -> `SUPABASE_SERVICE_ROLE_KEY` *(Keep secret!)*

---

## ⚡ STEP 2: Deploy Frontend on Cloudflare

You can deploy using either **Git Integration (Recommended)** or the **Wrangler CLI**.

---

### Option A: Cloudflare Git Integration (Recommended for CI/CD)

1. Push your repository to **GitHub** or **GitLab**.
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. In the left navigation, go to **Workers & Pages** -> **Create application** -> select the **Pages** tab -> **Connect to Git**.
4. Select your `100x-minds` repository.
5. In the **Build settings** section:
   - **Framework preset**: `None` or `Next.js`
   - **Build command**: `npx @opennextjs/cloudflare`
   - **Build output directory**: `.open-next/assets`
   - **Root directory**: `/`
6. Expand **Environment variables** and add:

| Variable Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL (`https://xyz.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase `anon` public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase `service_role` secret key |
| `ADMIN_EMAIL` | Admin email (e.g. `admin@100xminds.ai`) |
| `ADMIN_PASSWORD` | Strong password for admin console access |
| `AUTH_SECRET` | Random 32+ character string for JWT signing |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (e.g. `https://your-domain.pages.dev`) |
| `NODE_VERSION` | `20` |

7. Under **Settings** -> **Functions** -> **Compatibility flags**, ensure `nodejs_compat` is enabled.
8. Click **Save and Deploy**. Cloudflare will build and deploy your site across their global edge network!

---

### Option B: Direct CLI Deployment via Wrangler

If you prefer to deploy directly from your local terminal:

#### 1. Authenticate with Cloudflare
```bash
npx wrangler login
```

#### 2. Set Production Secrets
Run the following commands in your project root to securely store your secrets in Cloudflare:
```bash
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
# Enter your Supabase service_role key when prompted

npx wrangler secret put AUTH_SECRET
# Enter your random JWT secret key when prompted

npx wrangler secret put ADMIN_PASSWORD
# Enter your admin password when prompted
```

#### 3. Build with OpenNext
```bash
npm run build:cloudflare
```
This builds your Next.js application into `.open-next/worker.js` and extracts static client assets into `.open-next/assets`.

#### 4. Deploy
```bash
npm run deploy:cloudflare
```
Wrangler will upload your assets and worker, outputting your live production URL:
```
✨ Successfully published 100x-minds-platform
   https://100x-minds-platform.<your-subdomain>.workers.dev
```

---

## ⚡ STEP 3: Verification & Health Check

After deployment, verify that both the Cloudflare frontend and Supabase backend are functioning:

1. **Public Site Navigation**:
   - Open your Cloudflare URL.
   - Navigate to `/services`, `/casestudy`, and `/blog`.
2. **Contact Inquiry / Audit Form**:
   - Submit a test inquiry on the Architecture Audit form (`/services#audit-form`) or `/contact`.
   - Go to Supabase Dashboard -> **Table Editor** -> `contact_inquiries` to confirm the row was recorded.
3. **Admin Dashboard Login**:
   - Go to `/login` on your live site.
   - Enter your `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
   - Confirm you are redirected to `/dashboard`.
   - View your test message under `/dashboard/messages`.
4. **Publish a Blog or Case Study**:
   - Go to `/dashboard/blogs` -> **Write Blog**.
   - Fill in an article and click **Publish Post**.
   - Check Supabase `blogs` table and visit `/blog` on your public site to see the article live!

---

## 🔧 Local Development with Supabase

To test against your live Supabase database locally:
1. Create or open `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ADMIN_EMAIL="admin@100xminds.ai"
   ADMIN_PASSWORD="your-local-password"
   AUTH_SECRET="local-dev-secret-key-100x-minds"
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000`.
