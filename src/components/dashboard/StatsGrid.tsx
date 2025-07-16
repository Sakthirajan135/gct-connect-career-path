
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  Building,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';

export const StatsGrid = () => {
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
      blue: 'from-blue-500 to-cyan-500',
      green: 'from-green-500 to-emerald-500',
      purple: 'from-purple-500 to-violet-500',
      orange: 'from-orange-500 to-amber-500',
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
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
  );
};
