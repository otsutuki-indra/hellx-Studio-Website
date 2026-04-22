-- HELLX STUDIO Database Schema Update
-- Adds plan_type to users and creates projects table

-- Add plan_type column to users table
ALTER TABLE users ADD COLUMN plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'infinity'));

-- Add query_count column to users table for tracking AI usage
ALTER TABLE users ADD COLUMN query_count INTEGER DEFAULT 0;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'completed')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Create AI_Chats table for storing prompts and responses
CREATE TABLE IF NOT EXISTS ai_chats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_ai_chats_user_id ON ai_chats(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chats_created_at ON ai_chats(created_at);
