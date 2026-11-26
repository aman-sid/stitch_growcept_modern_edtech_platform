-- =============================================================================
-- 100x MINDS — Supabase Production Database Schema
-- Run this in your Supabase SQL Editor (https://app.supabase.com/project/_/sql)
-- =============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. CONTACT INQUIRIES & ARCHITECTURE AUDITS TABLE
-- -----------------------------------------------------------------------------
create table if not exists public.contact_inquiries (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text not null,
    company text,
    role text,
    track text default 'ai-consulting',
    budget text,
    timeline text default 'immediate',
    message text,
    status text default 'pending' check (status in ('pending', 'reviewed', 'contacted', 'archived')),
    metadata jsonb default '{}'::jsonb
);

create index if not exists idx_contact_inquiries_email on public.contact_inquiries(email);
create index if not exists idx_contact_inquiries_status on public.contact_inquiries(status);
create index if not exists idx_contact_inquiries_created_at on public.contact_inquiries(created_at desc);

-- -----------------------------------------------------------------------------
-- 2. NEWSLETTER SUBSCRIBERS TABLE
-- -----------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text unique not null,
    source text default 'website_footer',
    status text default 'active' check (status in ('active', 'unsubscribed')),
    metadata jsonb default '{}'::jsonb
);

create index if not exists idx_newsletter_subscribers_email on public.newsletter_subscribers(email);
create index if not exists idx_newsletter_subscribers_status on public.newsletter_subscribers(status);

-- -----------------------------------------------------------------------------
-- 3. CASE STUDIES TABLE
-- -----------------------------------------------------------------------------
create table if not exists public.case_studies (
    id text primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    tag text not null,
    category text not null,
    category_label text not null,
    client text not null,
    industry text not null,
    problem text not null,
    solution text not null,
    technology text[] default '{}',
    implementation text not null,
    results jsonb not null default '[]'::jsonb,
    testimonial jsonb,
    featured boolean default false,
    status text default 'published' check (status in ('draft', 'published'))
);

create index if not exists idx_case_studies_status on public.case_studies(status);
create index if not exists idx_case_studies_category on public.case_studies(category);
create index if not exists idx_case_studies_created_at on public.case_studies(created_at desc);

-- -----------------------------------------------------------------------------
-- 4. BLOGS TABLE
-- -----------------------------------------------------------------------------
create table if not exists public.blogs (
    id text primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    slug text unique not null,
    excerpt text not null,
    content text not null,
    category text not null default 'Autonomous Agents',
    tags text[] default '{}',
    author_name text not null default '100x MINDS Editorial',
    author_role text not null default 'Principal AI Architect',
    author_avatar text default '100x',
    cover_image text,
    read_time text default '5 min read',
    featured boolean default false,
    status text default 'published' check (status in ('draft', 'published')),
    views integer default 0
);

create index if not exists idx_blogs_slug on public.blogs(slug);
create index if not exists idx_blogs_status on public.blogs(status);
create index if not exists idx_blogs_category on public.blogs(category);
create index if not exists idx_blogs_created_at on public.blogs(created_at desc);

-- -----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
alter table public.contact_inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.case_studies enable row level security;
alter table public.blogs enable row level security;

-- Contact Inquiries: Anyone can insert, only service role can read/manage
create policy "Allow public submissions to contact_inquiries"
    on public.contact_inquiries
    for insert
    to anon, authenticated
    with check (true);

create policy "Allow service role full access to contact_inquiries"
    on public.contact_inquiries
    for all
    to service_role
    using (true)
    with check (true);

-- Newsletter: Anyone can subscribe, only service role can read/manage
create policy "Allow public subscription to newsletter"
    on public.newsletter_subscribers
    for insert
    to anon, authenticated
    with check (true);

create policy "Allow service role full access to newsletter_subscribers"
    on public.newsletter_subscribers
    for all
    to service_role
    using (true)
    with check (true);

-- Case Studies: Public can read published items; service role has full access
create policy "Allow public read access to published case_studies"
    on public.case_studies
    for select
    to anon, authenticated
    using (status = 'published');

create policy "Allow service role full access to case_studies"
    on public.case_studies
    for all
    to service_role
    using (true)
    with check (true);

-- Blogs: Public can read published items; service role has full access
create policy "Allow public read access to published blogs"
    on public.blogs
    for select
    to anon, authenticated
    using (status = 'published');

create policy "Allow service role full access to blogs"
    on public.blogs
    for all
    to service_role
    using (true)
    with check (true);

-- -----------------------------------------------------------------------------
-- 6. AUTOMATED UPDATED_AT TRIGGER
-- -----------------------------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger trigger_contact_inquiries_updated_at
    before update on public.contact_inquiries
    for each row
    execute function public.handle_updated_at();

create trigger trigger_case_studies_updated_at
    before update on public.case_studies
    for each row
    execute function public.handle_updated_at();

create trigger trigger_blogs_updated_at
    before update on public.blogs
    for each row
    execute function public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 7. STORAGE BUCKET CONFIGURATION (CASES & BLOG MEDIA)
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values 
  ('casestudies', 'casestudies', true),
  ('blogs', 'blogs', true)
on conflict (id) do nothing;

create policy "Public Access to casestudies bucket"
on storage.objects for select
to public
using ( bucket_id = 'casestudies' );

create policy "Public Access to blogs bucket"
on storage.objects for select
to public
using ( bucket_id = 'blogs' );

create policy "Service Role upload access to casestudies"
on storage.objects for insert
to service_role
with check ( bucket_id = 'casestudies' );

create policy "Service Role upload access to blogs"
on storage.objects for insert
to service_role
with check ( bucket_id = 'blogs' );
