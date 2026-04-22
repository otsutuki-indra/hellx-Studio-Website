import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiChats, users } from "@/lib/db/schema";
import { eq, and, gte, sql } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (!user) {
      // Return mock data for new users
      return NextResponse.json(generateMockData());
    }

    // Get last 7 days of data
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const chatData = await db
      .select({
        date: sql<string>`date(${aiChats.createdAt})`,
        count: sql<number>`count(*)`,
      })
      .from(aiChats)
      .where(
        and(
          eq(aiChats.userId, user.id),
          gte(aiChats.createdAt, sevenDaysAgo.toISOString())
        )
      )
      .groupBy(sql`date(${aiChats.createdAt})`)
      .orderBy(sql`date(${aiChats.createdAt})`);

    // Fill in missing dates
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayData = chatData.find((d) => d.date === dateStr);

      result.push({
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        queries: dayData?.count || 0,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching usage chart:", error);
    return NextResponse.json(generateMockData());
  }
}

function generateMockData() {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      queries: Math.floor(Math.random() * 30) + 5,
    });
  }
  return data;
}
