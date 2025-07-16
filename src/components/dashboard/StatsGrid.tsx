
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
    { 
      title: 'Applications Sent', 
      value: '24', 
      change: '+8 this month', 
      icon: Briefcase, 
      trend: 'up', 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      title: 'Interviews Scheduled', 
      value: '6', 
      change: 'Next: Tomorrow', 
      icon: Calendar, 
      trend: 'up', 
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    { 
      title: 'Companies Applied', 
      value: '18', 
      change: '5 new this week', 
      icon: Building, 
      trend: 'up', 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    { 
      title: 'Success Rate', 
      value: '75%', 
      change: '+12% improvement', 
      icon: TrendingUp, 
      trend: 'up', 
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="h-4 w-4 text-emerald-600" />;
    if (trend === 'down') return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
          <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${stat.color}`} />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-semibold text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              {getTrendIcon(stat.trend)}
              <span className="ml-2">{stat.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
