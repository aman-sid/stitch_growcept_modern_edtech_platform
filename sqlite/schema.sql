-- =============================================================================
-- 100x MINDS — SQLite Database Schema
-- Converted from supabase/schema.sql
-- =============================================================================

PRAGMA foreign_keys = ON;

-- -----------------------------------------------------------------------------
-- 1. CONTACT INQUIRIES & ARCHITECTURE AUDITS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    role TEXT,
    track TEXT DEFAULT 'ai-consulting',
    budget TEXT,
    timeline TEXT DEFAULT 'immediate',
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'archived')),
    metadata TEXT DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);

-- -----------------------------------------------------------------------------
-- 2. NEWSLETTER SUBSCRIBERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    email TEXT UNIQUE NOT NULL,
    source TEXT DEFAULT 'website_footer',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    metadata TEXT DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);

-- -----------------------------------------------------------------------------
-- 3. CASE STUDIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS case_studies (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    tag TEXT NOT NULL,
    category TEXT NOT NULL,
    category_label TEXT NOT NULL,
    client TEXT NOT NULL,
    industry TEXT NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    technology TEXT DEFAULT '[]', -- JSON array of strings
    implementation TEXT NOT NULL,
    results TEXT NOT NULL DEFAULT '[]', -- JSON array of objects
    testimonial TEXT, -- JSON object
    featured INTEGER DEFAULT 0, -- 0 = false, 1 = true
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published'))
);

CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON case_studies(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_created_at ON case_studies(created_at DESC);

-- -----------------------------------------------------------------------------
-- 4. BLOGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Autonomous Agents',
    tags TEXT DEFAULT '[]', -- JSON array of strings
    author_name TEXT NOT NULL DEFAULT '100x MINDS Editorial',
    author_role TEXT NOT NULL DEFAULT 'Principal AI Architect',
    author_avatar TEXT DEFAULT '100x',
    cover_image TEXT,
    read_time TEXT DEFAULT '5 min read',
    featured INTEGER DEFAULT 0, -- 0 = false, 1 = true
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    views INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- -----------------------------------------------------------------------------
-- 5. AUTOMATED UPDATED_AT TRIGGERS
-- -----------------------------------------------------------------------------
CREATE TRIGGER IF NOT EXISTS trigger_contact_inquiries_updated_at
AFTER UPDATE ON contact_inquiries
FOR EACH ROW
BEGIN
    UPDATE contact_inquiries 
    SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') 
    WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS trigger_case_studies_updated_at
AFTER UPDATE ON case_studies
FOR EACH ROW
BEGIN
    UPDATE case_studies 
    SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') 
    WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS trigger_blogs_updated_at
AFTER UPDATE ON blogs
FOR EACH ROW
BEGIN
    UPDATE blogs 
    SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') 
    WHERE id = OLD.id;
END;
