"use server";

import { getDb } from "@/lib/db";
import { users, activities, projects, aiChats } from "@/lib/db/schema";
import { eq, desc, sql, count } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";

export type PlanType = "free" | "pro" | "infinity";

export const PLAN_LIMITS = {
  free: { queries: 50, name: "Free", badge: "gray" },
  pro: { queries: 500, name: "Pro", badge: "gold" },
  infinity: { queries: Infinity, name: "Level Infinity", badge: "cyan" },
} as const;

export async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const db = getDb();

  // Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (existingUser) {
    return existingUser;
  }

  // Create new user
  const newUserId = crypto.randomUUID();
  await db.insert(users).values({
    id: newUserId,
    clerkId: userId,
    email: clerkUser.emailAddresses[0]?.emailAddress || "",
    name: clerkUser.fullName || clerkUser.firstName || "User",
    imageUrl: clerkUser.imageUrl,
    planType: "free",
    queryCount: 0,
  });

  return db.query.users.findFirst({
    where: eq(users.id, newUserId),
  });
}

export async function getUserStats() {
  const user = await getOrCreateUser();
  if (!user) return null;

  const db = getDb();

  // Get total queries
  const totalQueries = user.queryCount || 0;

  // Get total projects
  const projectsResult = await db
    .select({ count: count() })
    .from(projects)
    .where(eq(projects.userId, user.id));
  const totalProjects = projectsResult[0]?.count || 0;

  // Get recent activity count (last 7 days)
  const recentActivities = await db.query.activities.findMany({
    where: eq(activities.userId, user.id),
    orderBy: [desc(activities.createdAt)],
    limit: 10,
  });

  // Calculate days since registration
  const createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
  const daysSinceJoined = Math.floor(
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const planInfo = PLAN_LIMITS[user.planType as PlanType] || PLAN_LIMITS.free;
  const queriesRemaining =
    planInfo.queries === Infinity
      ? Infinity
      : Math.max(0, planInfo.queries - totalQueries);

  return {
    user,
    totalQueries,
    totalProjects,
    daysSinceJoined: daysSinceJoined || 1,
    recentActivities,
    planInfo,
    queriesRemaining,
    queriesUsed: totalQueries,
    queryLimit: planInfo.queries,
  };
}

export async function incrementQueryCount() {
  const user = await getOrCreateUser();
  if (!user) return { success: false, error: "User not found" };

  const db = getDb();
  await db
    .update(users)
    .set({
      queryCount: sql`${users.queryCount} + 1`,
      updatedAt: sql`(datetime('now'))`,
    })
    .where(eq(users.id, user.id));

  return { success: true };
}

export async function checkQueryLimit() {
  const user = await getOrCreateUser();
  if (!user) return { allowed: false, error: "User not found" };

  const planInfo = PLAN_LIMITS[user.planType as PlanType] || PLAN_LIMITS.free;
  const currentCount = user.queryCount || 0;

  if (planInfo.queries === Infinity) {
    return { allowed: true, remaining: Infinity };
  }

  const allowed = currentCount < planInfo.queries;
  return {
    allowed,
    remaining: Math.max(0, planInfo.queries - currentCount),
    limit: planInfo.queries,
    used: currentCount,
  };
}

export async function logAiChat(prompt: string, response: string) {
  const user = await getOrCreateUser();
  if (!user) return { success: false };

  const db = getDb();
  await db.insert(aiChats).values({
    userId: user.id,
    prompt,
    response,
    tokensUsed: Math.ceil((prompt.length + response.length) / 4),
  });

  // Also log as activity
  await db.insert(activities).values({
    userId: user.id,
    type: "chat",
    description: `AI conversation: "${prompt.slice(0, 50)}${prompt.length > 50 ? "..." : ""}"`,
    metadata: JSON.stringify({ promptLength: prompt.length, responseLength: response.length }),
  });

  return { success: true };
}

export async function getRecentActivities() {
  const user = await getOrCreateUser();
  if (!user) return [];

  const db = getDb();
  return db.query.activities.findMany({
    where: eq(activities.userId, user.id),
    orderBy: [desc(activities.createdAt)],
    limit: 10,
  });
}

export async function getUserProjects() {
  const user = await getOrCreateUser();
  if (!user) return [];

  const db = getDb();
  return db.query.projects.findMany({
    where: eq(projects.userId, user.id),
    orderBy: [desc(projects.createdAt)],
  });
}

export async function createProject(name: string, description?: string) {
  const user = await getOrCreateUser();
  if (!user) return { success: false, error: "User not found" };

  const db = getDb();
  const result = await db.insert(projects).values({
    userId: user.id,
    name,
    description,
    status: "active",
  });

  // Log activity
  await db.insert(activities).values({
    userId: user.id,
    type: "project",
    description: `Created project: ${name}`,
  });

  return { success: true, projectId: result.lastInsertRowid };
}
