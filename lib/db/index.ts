import { createClient, Client } from "@libsql/client";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

let client: Client | null = null;
let db: LibSQLDatabase<typeof schema> | null = null;

function getClient(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    if (!url) {
      throw new Error("TURSO_DATABASE_URL is not configured");
    }
    client = createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export function getDb(): LibSQLDatabase<typeof schema> {
  if (!db) {
    db = drizzle(getClient(), { schema });
  }
  return db;
}

// For backwards compatibility - lazy initialization
export { getDb as db, getClient as client };
