
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { ReadinessScore } from '@/components/dashboard/ReadinessScore';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 rounded-2xl border border-border/50">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Welcome back, {user.name || 'Student'}
            </h1>
            <p className="text-lg text-muted-foreground">
              Here's your placement progress overview
            </p>
          </div>
          <Badge 
            variant="outline" 
            className="px-6 py-3 text-base font-medium bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 transition-colors"
          >
            {user.role === 'admin' ? 'Administrator' : 'Final Year Student'}
          </Badge>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Charts Section */}
        <ChartsSection />

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <QuickActions />
          <RecentActivity />
        </div>

        {/* Readiness Score */}
        <ReadinessScore />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
