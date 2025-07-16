
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Users, 
  BookOpen, 
  Upload,
  LogOut,
  TestTube,
  Building
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const QuickActions = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleAction = (action: string) => {
    switch (action) {
      case 'upload-resume':
        navigate('/resume');
        toast({
          title: "Resume Upload",
          description: "Redirecting to resume upload page...",
        });
        break;
      case 'schedule-interview':
        navigate('/calendar');
        toast({
          title: "Interview Scheduler",
          description: "Opening calendar to schedule interviews...",
        });
        break;
      case 'view-companies':
        navigate('/companies');
        toast({
          title: "Company Browser",
          description: "Loading available companies...",
        });
        break;
      case 'practice-tests':
        navigate('/tests');
        toast({
          title: "Mock Tests",
          description: "Opening practice test modules...",
        });
        break;
      case 'logout':
        logout();
        toast({
          title: "Logged Out",
          description: "You have been successfully logged out.",
        });
        break;
      default:
        toast({
          title: "Feature Coming Soon",
          description: "This feature will be available soon!",
        });
    }
  };

  const actions = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Upload and analyze your resume",
      action: "upload-resume",
      variant: "default" as const
    },
    {
      icon: Calendar,
      title: "Schedule Interview",
      description: "Book your next interview slot",
      action: "schedule-interview",
      variant: "outline" as const
    },
    {
      icon: Building,
      title: "Browse Companies",
      description: "Explore job opportunities",
      action: "view-companies",
      variant: "outline" as const
    },
    {
      icon: TestTube,
      title: "Practice Tests",
      description: "Take mock tests and assessments",
      action: "practice-tests",
      variant: "outline" as const
    },
    {
      icon: LogOut,
      title: "Logout",
      description: "Sign out of your account",
      action: "logout",
      variant: "destructive" as const
    }
  ];

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used actions and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="justify-start h-auto p-4 text-left"
              onClick={() => handleAction(action.action)}
            >
              <action.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <div className="flex flex-col items-start">
                <span className="font-medium">{action.title}</span>
                <span className="text-xs opacity-70">{action.description}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
