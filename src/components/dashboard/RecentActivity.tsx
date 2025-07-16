
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'application',
      title: 'Applied to Google India',
      description: 'Software Engineer - Full Stack',
      timestamp: '2 hours ago',
      status: 'pending',
      icon: FileText,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Scheduled',
      description: 'Microsoft - Technical Round',
      timestamp: '1 day ago',
      status: 'scheduled',
      icon: Calendar,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      id: 3,
      type: 'test',
      title: 'Mock Test Completed',
      description: 'Data Structures & Algorithms - Score: 85%',
      timestamp: '2 days ago',
      status: 'completed',
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 4,
      type: 'feedback',
      title: 'Interview Feedback Received',
      description: 'Amazon - Positive feedback on coding round',
      timestamp: '3 days ago',
      status: 'received',
      icon: MessageSquare,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Resume Update Reminder',
      description: 'Add new project and certifications',
      timestamp: '1 week ago',
      status: 'pending',
      icon: AlertCircle,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'received':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
        <CardDescription className="text-base">Your latest placement-related activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group">
              <div className={`p-3 rounded-xl ${activity.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-base truncate">{activity.title}</p>
                  <Badge 
                    variant="outline" 
                    className={`text-sm ${getStatusColor(activity.status)}`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
