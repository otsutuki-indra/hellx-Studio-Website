import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { GridBackground } from "@/components/layout/grid-background";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GridBackground variant="subtle" showGradient={false}>
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="ml-20 min-h-screen p-4 transition-all duration-300 lg:ml-64">
        {/* Header */}
        <header className="glass-box mb-6 flex items-center justify-between rounded-2xl px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back to HELLX STUDIO
            </p>
          </div>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 ring-2 ring-neon-purple/30",
              },
            }}
          />
        </header>

        {/* Page Content - Boxed */}
        <div className="glass-box rounded-2xl p-6">
          {children}
        </div>
      </div>

      {/* AI Chat Sidebar */}
      <ChatSidebar />
    </GridBackground>
  );
}
