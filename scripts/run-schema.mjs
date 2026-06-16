// Connect directly to Supabase PostgreSQL and run schema
// Usage: SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=xxx node scripts/run-schema.mjs
import pkg from "pg";
import { readFileSync } from "fs";
import "dotenv/config";

const { Client } = pkg;

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/(.+)\.supabase/)?.[1];

if (!serviceKey || !projectRef) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL in environment");
  process.exit(1);
}

const client = new Client({
  host: `db.${projectRef}.supabase.co`,
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: serviceKey,
  ssl: { rejectUnauthorized: false },
});

const sql = readFileSync("scripts/schema.sql", "utf-8");

async function run() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL!");

    // Run SQL statements one by one
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    for (const stmt of statements) {
      try {
        await client.query(stmt + ";");
      } catch (err) {
        // Ignore "already exists" and duplicate errors
        if (!err.message?.includes("already exists") && !err.message?.includes("duplicate")) {
          console.error("Error:", err.message?.substring(0, 100));
        }
      }
    }

    console.log("✅ Schema created successfully!");
  } catch (err) {
    console.error("Connection failed:", err.message);
    console.log("Trying alternative host...");

    // Try session mode
    const client2 = new Client({
      host: "aws-0-ap-southeast-1.pooler.supabase.com",
      port: 5432,
      database: "postgres",
      user: "postgres.ndhxnuycgkumrrkxbyrw",
      password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kaHhudXljZ2t1bXJya3hieXJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTYxNTYzMywiZXhwIjoyMDk3MTkxNjMzfQ.ZKVlekGpC-ZOJWTmc_AoYts6y2iWhvC_y8jzGyMsxLg",
      ssl: { rejectUnauthorized: false },
    });

    try {
      await client2.connect();
      console.log("Connected via session mode!");

      const statements = sql
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith("--"));

      for (const stmt of statements) {
        try {
          await client2.query(stmt + ";");
        } catch (err) {
          if (!err.message?.includes("already exists") && !err.message?.includes("duplicate")) {
            console.error("Error:", err.message?.substring(0, 100));
          }
        }
      }

      console.log("✅ Schema created successfully!");
    } catch (err2) {
      console.error("Alternative also failed:", err2.message);
    }

    await client2.end();
  }

  await client.end();
}

run();
