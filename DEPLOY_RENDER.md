# Deploying 100x MINDS Platform to Render.com

This guide provides a complete, step-by-step walkthrough to deploy this Next.js 15 application to [Render.com](https://render.com) as a high-performance **Web Service**.

---

## Prerequisites

1. A **GitHub** or **GitLab** account with this repository pushed.
2. A free or paid account at [Render.com](https://render.com).
3. (Optional) Your Supabase project URL and API keys if connecting to live database storage.

---

## Method 1: Web Service Setup (Recommended)

### Step 1: Push Code to GitHub / GitLab
Ensure your latest changes are committed and pushed to your remote repository:
```bash
git add .
git commit -m "Prepare for Render.com deployment"
git push origin main
```

---

### Step 2: Create a New Web Service on Render
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** in the top right and select **Web Service**.
3. Choose **Build and deploy from a Git repository**.
4. Connect your GitHub/GitLab account and select your repository (`stitch_growcept_modern_edtech_platform`).

---

### Step 3: Configure Service Settings

Fill in the settings form as follows:

| Setting | Value |
| :--- | :--- |
| **Name** | `100x-minds-platform` (or your chosen project name) |
| **Region** | Choose the region closest to your users (e.g., `Singapore`, `Frankfurt`, `Oregon`) |
| **Branch** | `main` |
| **Root Directory** | Leave blank (root of project) |
| **Runtime** | **Node** |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start` |
| **Instance Type** | **Free** (or Starter/Standard for production with 0 spin-down delay) |

> [!NOTE]
> Render automatically injects the `$PORT` environment variable and Next.js automatically binds to it when running `npm run start` (`next start`).

---

### Step 4: Configure Environment Variables

Under the **Environment Variables** section on Render, click **Add Environment Variable** and add the following keys:

#### 1. Node Runtime Version (Crucial for Next.js 15 & React 19)
- `NODE_VERSION` = `20` (or `22`)

#### 2. Admin Dashboard Authentication
- `ADMIN_EMAIL` = `admin@100xminds.ai` *(or your custom admin email)*
- `ADMIN_PASSWORD` = *(set a strong, secure password)*
- `AUTH_SECRET` = *(enter a long random 32+ character string, e.g., run `openssl rand -base64 32`)*

#### 3. Canonical Website URL
- `NEXT_PUBLIC_SITE_URL` = `https://<your-service-name>.onrender.com` *(or your custom domain if attached)*

#### 4. Supabase Database Configuration (Optional if running mock in development)
- `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project-ref.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-public-key`
- `SUPABASE_SERVICE_ROLE_KEY` = `your-service-role-secret-key`

---

### Step 5: Deploy the Service
1. Click **Deploy Web Service** at the bottom of the page.
2. Render will initiate the build logs:
   - Node 20 will be installed.
   - Dependencies will be resolved (`npm install`).
   - Next.js will compile the app (`npm run build`).
   - The production server will spin up on the assigned port.
3. Once the build completes, the status will show **Live** with a green dot.
4. Your site will be available at: `https://<your-service-name>.onrender.com`.

---

## Method 2: Infrastructure-as-Code via `render.yaml` (Blueprint)

You can also deploy with a single click using Render's Blueprint specification. A `render.yaml` file has been added to the root of your project:

```yaml
services:
  - type: web
    name: 100x-minds-platform
    runtime: node
    plan: free
    region: singapore
    buildCommand: npm install && npm run build
    startCommand: npm run start
    envVars:
      - key: NODE_VERSION
        value: 20
      - key: ADMIN_EMAIL
        sync: false
      - key: ADMIN_PASSWORD
        sync: false
      - key: AUTH_SECRET
        generateValue: true
      - key: NEXT_PUBLIC_SITE_URL
        sync: false
      - key: NEXT_PUBLIC_SUPABASE_URL
        sync: false
      - key: NEXT_PUBLIC_SUPABASE_ANON_KEY
        sync: false
      - key: SUPABASE_SERVICE_ROLE_KEY
        sync: false
```

To use Blueprint:
1. Go to [Render Dashboard](https://dashboard.render.com/) > **Blueprints** > **New Blueprint Instance**.
2. Select your repository.
3. Render reads `render.yaml` automatically and prompts you for the missing secret variables.
4. Click **Apply**.

---

## Important Render.com Nuances & Troubleshooting

### 1. Free Tier Spin-Down (Cold Starts)
- On Render's **Free Tier**, the server goes to sleep after 15 minutes of inactivity.
- The first request after sleep may take 30–50 seconds to spin back up.
- Upgrading to the **Starter plan ($7/mo)** keeps the server warm 24/7 with zero cold starts.

### 2. Custom Domain & SSL
1. In your Render Web Service dashboard, go to **Settings** > **Custom Domains**.
2. Click **Add Custom Domain** (e.g. `100xminds.ai` or `app.yourdomain.com`).
3. Add the provided CNAME / A records in your DNS provider (Cloudflare, Namecheap, GoDaddy).
4. Render automatically provisions and renews a free Let's Encrypt SSL certificate.

### 3. Testing Dashboard Login After Deployment
- Visit: `https://your-app.onrender.com/login`
- Enter your configured `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- You will be redirected to the secure `/dashboard` to manage inquiries and write case studies.

