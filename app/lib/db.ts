// app/lib/db.ts
import { Database } from 'sqlite3';
import { open } from 'sqlite';

// Open database (runs only on server)
const dbPromise = open({
  filename: './angolalab.db',
  driver: Database
});

// ✅ ONLY export async functions — NO raw objects!
export async function runQuery(sql: string, params: any[] = []) {
  const db = await dbPromise;
  return db.all(sql, params);
}

// Optional: if you need to run INSERT/CREATE/UPDATE
export async function runExecute(sql: string, params: any[] = []) {
  const db = await dbPromise;
  return db.run(sql, params);
}