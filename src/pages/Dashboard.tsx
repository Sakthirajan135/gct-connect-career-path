
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  Building,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Sample data for charts
  const applicationData = [
    { name: 'Jan', applications: 2, selections: 0 },
    { name: 'Feb', applications: 5, selections: 1 },
    { name: 'Mar', applications: 8, selections: 2 },
    { name: 'Apr', applications: 12, selections: 3 },
  ];

  const testScoreData = [
    { name: 'JavaScript', score: 85 },
    { name: 'DSA', score: 78 },
    { name: 'System Design', score: 65 },
    { name: 'Database', score: 90 },
  ];

  const statusData = [
    { name: 'Applied', value: 12, color: '#3b82f6' },
    { name: 'Shortlisted', value: 5, color: '#f59e0b' },
    { name: 'Selected', value: 3, color: '#10b981' },
    { name: 'Rejected', value: 4, color: '#ef4444' },
  ];

  const stats = [
    { title: 'Applications Sent', value: '24', change: '+8 this month', icon: Briefcase, trend: 'up', color: 'blue' },
    { title: 'Interviews Scheduled', value: '6', change: 'Next: Tomorrow', icon: Calendar, trend: 'up', color: 'green' },
    { title: 'Companies Applied', value: '18', change: '5 new this week', icon: Building, trend: 'up', color: 'purple' },
    { title: 'Success Rate', value: '75%', change: '+12% improvement', icon: TrendingUp, trend: 'up', color: 'orange' },
  ];

  // Calculate placement readiness score dynamically
  const calculateReadinessScore = () => {
    const profileCompleteness = user.name && user.email ? 95 : 60;
    const testScores = 78; // Average of mock test scores
    const applicationRate = 85; // Based on application activity
    const interviewSuccess = 70; // Based on interview performance
    
    return Math.round((profileCompleteness + testScores + applicationRate + interviewSuccess) / 4);
  };

  const readinessScore = calculateReadinessScore();

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    return <Activity className="h-4 w-4 text-gray-600" />;
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
    };
    return colorMap[color] || colorMap.blue;
  };

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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getColorClasses(stat.color)}`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${getColorClasses(stat.color)} shadow-md`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getTrendIcon(stat.trend)}
                  <span className="ml-1">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Trends */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
              <CardDescription>Monthly application and selection progress</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
                  <Bar dataKey="selections" fill="#10b981" name="Selections" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Application Status Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>Current status of your applications</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Scores */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Test Performance</CardTitle>
              <CardDescription>Your latest mock test scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testScoreData.map((test, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{test.name}</span>
                      <span className="font-medium">{test.score}%</span>
                    </div>
                    <Progress value={test.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <QuickActions />
        </div>

        {/* Recent Activities */}
        <RecentActivity />

        {/* Readiness Score */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Placement Readiness Score</span>
            </CardTitle>
            <CardDescription>Overall assessment of your preparation level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{readinessScore}%</div>
                <div className="text-muted-foreground">
                  {readinessScore >= 80 ? "Excellent! You're well prepared." : 
                   readinessScore >= 60 ? "Good progress! Keep improving." : 
                   "Focus on strengthening your profile."}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-muted-foreground">Profile Completeness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">78%</div>
                  <div className="text-sm text-muted-foreground">Test Scores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">85%</div>
                  <div className="text-sm text-muted-foreground">Application Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">70%</div>
                  <div className="text-sm text-muted-foreground">Interview Success</div>
                </div>
              </div>
              
              <Progress value={readinessScore} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
