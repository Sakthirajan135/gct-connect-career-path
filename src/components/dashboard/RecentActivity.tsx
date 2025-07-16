
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
      icon: FileText
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Scheduled',
      description: 'Microsoft - Technical Round',
      timestamp: '1 day ago',
      status: 'scheduled',
      icon: Calendar
    },
    {
      id: 3,
      type: 'test',
      title: 'Mock Test Completed',
      description: 'Data Structures & Algorithms - Score: 85%',
      timestamp: '2 days ago',
      status: 'completed',
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'feedback',
      title: 'Interview Feedback Received',
      description: 'Amazon - Positive feedback on coding round',
      timestamp: '3 days ago',
      status: 'received',
      icon: MessageSquare
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Resume Update Reminder',
      description: 'Add new project and certifications',
      timestamp: '1 week ago',
      status: 'pending',
      icon: AlertCircle
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
    <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest placement-related activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 rounded-full bg-primary/10">
                <activity.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm truncate">{activity.title}</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(activity.status)}`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
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
