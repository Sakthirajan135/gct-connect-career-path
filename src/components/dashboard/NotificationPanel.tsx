
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Bell, Briefcase, FileText, Award, Clock } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

export const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'drive',
      title: 'New Drive: TCS Campus Recruitment',
      message: 'TCS is conducting campus recruitment. Last date to apply: Dec 25, 2024',
      time: '2 hours ago',
      read: false,
      icon: Briefcase
    },
    {
      id: 2,
      type: 'resume',
      title: 'Resume Update Recommended',
      message: 'Your resume score is 75%. Update skills section to improve.',
      time: '1 day ago',
      read: false,
      icon: FileText
    },
    {
      id: 3,
      type: 'test',
      title: 'Mock Test Reminder',
      message: 'Complete your JavaScript fundamentals test before the drive.',
      time: '2 days ago',
      read: true,
      icon: Clock
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'drive': return 'text-blue-500';
      case 'resume': return 'text-orange-500';
      case 'test': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-background border-l shadow-lg z-50 overflow-y-auto">
      <Card className="border-0 rounded-none h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-muted ${getIconColor(notification.type)}`}>
                    <notification.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium truncate">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <Badge variant="default" className="text-xs">New</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
