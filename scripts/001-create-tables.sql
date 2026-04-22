-- HELLX STUDIO Database Schema
-- Run this script to create the initial database tables

-- Users table (synced from Clerk)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  clerk_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT,
  image_url TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Chat logs table for AI conversation history
CREATE TABLE IF NOT EXISTS chat_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT REFERENCES users(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Activities table for user activity tracking
CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT REFERENCES users(id),
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_logs_user_id ON chat_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_created_at ON chat_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at);
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
