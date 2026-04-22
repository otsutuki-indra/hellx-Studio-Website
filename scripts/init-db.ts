import { db } from "@/lib/db";
import { users, chatMessages, aiUsageStats } from "@/lib/db/schema";

async function initializeDatabase() {
  try {
    console.log("[v0] Initializing database tables...");

    // Create tables using Drizzle
    await db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        clerkId TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        name TEXT,
        avatar TEXT,
        createdAt TEXT NOT NULL
      )`
    );

    await db.run(
      `CREATE TABLE IF NOT EXISTS chatMessages (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        content TEXT NOT NULL,
        role TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )`
    );

    await db.run(
      `CREATE TABLE IF NOT EXISTS aiUsageStats (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        messagesCount INTEGER DEFAULT 0,
        tokensUsed INTEGER DEFAULT 0,
        lastUpdated TEXT NOT NULL
      )`
    );

    console.log("[v0] Database initialized successfully!");
  } catch (error) {
    console.error("[v0] Database initialization error:", error);
  }
}

initializeDatabase();
