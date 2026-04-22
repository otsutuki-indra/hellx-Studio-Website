import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name"),
  imageUrl: text("image_url"),
  planType: text("plan_type").default("free"), // 'free' | 'pro' | 'infinity'
  queryCount: integer("query_count").default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export const chatLogs = sqliteTable("chat_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => users.id),
  role: text("role").notNull(), // 'user' | 'assistant'
  content: text("content").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const activities = sqliteTable("activities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => users.id),
  type: text("type").notNull(), // 'chat' | 'login' | 'project' etc.
  description: text("description").notNull(),
  metadata: text("metadata"), // JSON string for additional data
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").default("active"), // 'active' | 'archived' | 'completed'
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export const aiChats = sqliteTable("ai_chats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => users.id),
  prompt: text("prompt").notNull(),
  response: text("response").notNull(),
  tokensUsed: integer("tokens_used").default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ChatLog = typeof chatLogs.$inferSelect;
export type NewChatLog = typeof chatLogs.$inferInsert;
export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type AiChat = typeof aiChats.$inferSelect;
export type NewAiChat = typeof aiChats.$inferInsert;
