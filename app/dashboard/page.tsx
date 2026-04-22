import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { UsageChart } from "@/components/dashboard/usage-chart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <StatsCards />

      {/* Usage Chart */}
      <UsageChart />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Feed - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        {/* Profile Card */}
        <div>
          <ProfileCard />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
