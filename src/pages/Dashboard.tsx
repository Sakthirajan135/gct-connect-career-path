
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name || 'Student'}</h1>
            <p className="text-muted-foreground mt-1">
              Here's your placement progress overview
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
            {user.role === 'admin' ? 'Administrator' : 'Final Year Student'}
          </Badge>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Charts Section */}
        <ChartsSection />

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
