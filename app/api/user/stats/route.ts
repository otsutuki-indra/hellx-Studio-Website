import { getUserStats } from "@/lib/actions/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stats = await getUserStats();

    if (!stats) {
      return NextResponse.json(
        { error: "Failed to fetch stats" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: {
        planType: stats.user.planType || "free",
        email: stats.user.email,
        name: stats.user.name,
      },
      totalQueries: stats.totalQueries,
      totalProjects: stats.totalProjects,
      daysSinceJoined: stats.daysSinceJoined,
      queriesRemaining: stats.queriesRemaining,
      queriesUsed: stats.queriesUsed,
      queryLimit: stats.queryLimit,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
