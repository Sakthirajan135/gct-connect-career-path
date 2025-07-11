
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Building,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getDashboardStats = (role: string) => {
    const statsMap: Record<string, any[]> = {
      student: [
        { title: 'Applications Sent', value: '12', change: '+2 this week', icon: Briefcase, trend: 'up', color: 'blue' },
        { title: 'Interviews Scheduled', value: '3', change: 'Next: Tomorrow', icon: Calendar, trend: 'up', color: 'green' },
        { title: 'Profile Completeness', value: '85%', change: '15% remaining', icon: Users, trend: 'neutral', color: 'orange' },
        { title: 'Success Rate', value: '67%', change: '+5% improvement', icon: TrendingUp, trend: 'up', color: 'purple' },
      ],
      placement_officer: [
        { title: 'Active Drives', value: '8', change: '3 this month', icon: Calendar, trend: 'up', color: 'blue' },
        { title: 'Registered Students', value: '342', change: '+23 new', icon: Users, trend: 'up', color: 'green' },
        { title: 'Partner Companies', value: '45', change: '12 active', icon: Building, trend: 'up', color: 'purple' },
        { title: 'Placement Rate', value: '78%', change: '+12% vs last year', icon: Target, trend: 'up', color: 'orange' },
      ],
      recruiter: [
        { title: 'Available Profiles', value: '156', change: 'Filtered: 23', icon: Users, trend: 'neutral', color: 'blue' },
        { title: 'Scheduled Interviews', value: '12', change: '8 pending', icon: Calendar, trend: 'up', color: 'green' },
        { title: 'Feedback Pending', value: '5', change: '2 overdue', icon: Clock, trend: 'down', color: 'orange' },
        { title: 'Selection Rate', value: '45%', change: 'Above average', icon: CheckCircle, trend: 'up', color: 'purple' },
      ],
      // Add more role-specific stats...
    };
    return statsMap[role] || statsMap.student;
  };

  const stats = getDashboardStats(user.role);

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
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your placement journey today.
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
            {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Badge>
        </div>

        {/* Stats Grid */}
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
                  <CardDescription>Your latest placement activities</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'application', company: 'TCS', time: '2 hours ago', status: 'completed' },
                  { type: 'interview', company: 'Infosys', time: '1 day ago', status: 'scheduled' },
                  { type: 'update', company: 'Resume', time: '3 days ago', status: 'updated' },
                  { type: 'test', company: 'Mock Test', time: '5 days ago', status: 'completed' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' : 
                      activity.status === 'scheduled' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {activity.type === 'application' && 'Applied to '}
                        {activity.type === 'interview' && 'Interview scheduled with '}
                        {activity.type === 'update' && 'Updated '}
                        {activity.type === 'test' && 'Completed '}
                        <span className="text-primary">{activity.company}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
                  <CardDescription>Your placement calendar</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'TCS Technical Interview', date: 'Tomorrow', time: '10:00 AM', type: 'interview' },
                  { title: 'Infosys Pre-placement Talk', date: 'Dec 20', time: '2:00 PM', type: 'event' },
                  { title: 'Mock Interview Session', date: 'Dec 22', time: '3:00 PM', type: 'preparation' },
                  { title: 'Resume Review Workshop', date: 'Dec 25', time: '11:00 AM', type: 'workshop' },
                ].map((event, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        event.type === 'interview' ? 'bg-red-500' : 
                        event.type === 'event' ? 'bg-blue-500' : 
                        event.type === 'preparation' ? 'bg-green-500' : 'bg-purple-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.date}, {event.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      event.type === 'interview' ? 'border-red-200 text-red-700' : 
                      event.type === 'event' ? 'border-blue-200 text-blue-700' : 
                      event.type === 'preparation' ? 'border-green-200 text-green-700' : 'border-purple-200 text-purple-700'
                    }`}>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Placement Progress</CardTitle>
            <CardDescription>Track your journey towards successful placement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completion</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Applications Sent</span>
                    <span className="font-medium">12/20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Interview Success</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
