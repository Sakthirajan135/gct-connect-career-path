
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
import { Sparkles, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-12">
        {/* Modern Header Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-5 rounded-3xl"></div>
          <div className="absolute top-8 right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
          
          <Card className="glass-card border-0 p-10 relative">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <span className="text-xl font-semibold text-primary">Welcome back</span>
                </div>
                <h1 className="text-6xl font-bold text-gradient leading-tight">
                  {user.name || 'Student'}
                </h1>
                <p className="text-2xl text-muted-foreground font-medium">
                  Here's your placement progress overview
                </p>
              </div>
              <Badge 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 transition-all duration-300 rounded-2xl"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                {user.role === 'admin' ? 'Administrator' : 'Final Year Student'}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Charts Section */}
        <ChartsSection />

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
