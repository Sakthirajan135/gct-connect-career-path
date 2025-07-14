
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { TopNavigation } from './TopNavigation';
import { NotificationPanel } from './NotificationPanel';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: string;
}

export const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background relative">
        <AppSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col">
          <TopNavigation 
            onNotificationClick={() => setShowNotifications(!showNotifications)}
            notificationCount={3}
          />
          <main className="flex-1 p-4 md:p-6 bg-muted/10 overflow-auto">
            {children}
          </main>
        </div>
        
        {/* Notification Panel */}
        {showNotifications && (
          <NotificationPanel 
            onClose={() => setShowNotifications(false)}
          />
        )}
      </div>
    </SidebarProvider>
  );
};
