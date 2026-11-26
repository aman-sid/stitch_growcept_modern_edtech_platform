const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const dbPath = path.join(__dirname, 'database.sqlite');
const schemaPath = path.join(__dirname, 'schema.sql');

console.log(`[SQLite] Initializing database at: ${dbPath}`);
const sql = fs.readFileSync(schemaPath, 'utf8');

const db = new DatabaseSync(dbPath);

// Execute schema
db.exec(sql);

// Verify tables
const tables = db.prepare("SELECT name, type FROM sqlite_master WHERE type IN ('table', 'trigger', 'index') AND name NOT LIKE 'sqlite_%' ORDER BY type, name;").all();
console.log('[SQLite] Created schema entities:');
console.table(tables);

// Test insert & trigger
console.log('\n[SQLite] Testing sample insert & trigger behavior on contact_inquiries...');
const insertStmt = db.prepare(`
  INSERT INTO contact_inquiries (name, email, company, role, message)
  VALUES (?, ?, ?, ?, ?)
  RETURNING id, name, email, created_at, updated_at, status;
`);

const inserted = insertStmt.get('Test User', 'test@example.com', 'Acme Corp', 'Lead Engineer', 'Testing SQLite setup');
console.log('Inserted record:', inserted);

const updateStmt = db.prepare(`
  UPDATE contact_inquiries SET status = 'reviewed' WHERE id = ? RETURNING id, status, updated_at;
`);
const updated = updateStmt.get(inserted.id);
console.log('Updated record (trigger fired):', updated);

// Clean up test record
db.prepare('DELETE FROM contact_inquiries WHERE id = ?;').run(inserted.id);
console.log('[SQLite] Cleaned up test record. Database is ready!');
db.close();
