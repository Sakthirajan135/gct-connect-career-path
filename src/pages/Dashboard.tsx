
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
  ArrowDownRight,
  FileText,
  Award
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
              Here's your placement progress overview
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
            Final Year Student
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
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-20 flex flex-col space-y-2">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Upload Resume</span>
                </Button>
                <Button className="h-20 flex flex-col space-y-2" variant="outline">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Take Mock Test</span>
                </Button>
                <Button className="h-20 flex flex-col space-y-2" variant="outline">
                  <Building className="h-6 w-6" />
                  <span className="text-sm">Browse Companies</span>
                </Button>
                <Button className="h-20 flex flex-col space-y-2" variant="outline">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">View Calendar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

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
                { type: 'application', company: 'TCS', time: '2 hours ago', status: 'completed', icon: Briefcase },
                { type: 'interview', company: 'Infosys', time: '1 day ago', status: 'scheduled', icon: Calendar },
                { type: 'test', company: 'JavaScript Mock Test', time: '2 days ago', status: 'completed', icon: FileText },
                { type: 'update', company: 'Profile Updated', time: '3 days ago', status: 'completed', icon: User },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'completed' ? 'bg-green-100' : 
                    activity.status === 'scheduled' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    <activity.icon className={`h-4 w-4 ${
                      activity.status === 'completed' ? 'text-green-600' : 
                      activity.status === 'scheduled' ? 'text-blue-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.type === 'application' && 'Applied to '}
                      {activity.type === 'interview' && 'Interview scheduled with '}
                      {activity.type === 'test' && 'Completed '}
                      {activity.type === 'update' && ''}
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
                <div className="text-4xl font-bold text-primary mb-2">82%</div>
                <div className="text-muted-foreground">You're doing great! Keep it up.</div>
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
              
              <Progress value={82} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
