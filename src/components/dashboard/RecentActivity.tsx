
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Briefcase, 
  Calendar, 
  FileText, 
  User,
  Upload,
  Award,
  Building
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'application' | 'interview' | 'test' | 'update' | 'upload' | 'achievement' | 'company';
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'scheduled' | 'pending' | 'failed';
}

export const RecentActivity = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Mock recent activities - in real app, this would fetch from database
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'application',
        title: 'Applied to TCS',
        description: 'Successfully submitted application for Software Engineer position',
        time: '2 hours ago',
        status: 'completed'
      },
      {
        id: '2',
        type: 'interview',
        title: 'Interview Scheduled',
        description: 'Technical interview with Infosys scheduled for tomorrow',
        time: '1 day ago',
        status: 'scheduled'
      },
      {
        id: '3',
        type: 'test',
        title: 'Mock Test Completed',
        description: 'JavaScript fundamentals test - Score: 85%',
        time: '2 days ago',
        status: 'completed'
      },
      {
        id: '4',
        type: 'upload',
        title: 'Resume Updated',
        description: 'Uploaded new resume version with project details',
        time: '3 days ago',
        status: 'completed'
      },
      {
        id: '5',
        type: 'achievement',
        title: 'Achievement Unlocked',
        description: 'Completed 10 mock interviews - Interview Master badge earned',
        time: '1 week ago',
        status: 'completed'
      }
    ];

    setActivities(mockActivities);
  }, [user]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application': return Briefcase;
      case 'interview': return Calendar;
      case 'test': return FileText;
      case 'update': return User;
      case 'upload': return Upload;
      case 'achievement': return Award;
      case 'company': return Building;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'scheduled': return 'bg-blue-100 text-blue-600';
      case 'pending': return 'bg-orange-100 text-orange-600';
      case 'failed': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
            <p className="text-sm text-muted-foreground">Your latest placement activities</p>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                  <ActivityIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                  {activity.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
