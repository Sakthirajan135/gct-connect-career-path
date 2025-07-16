
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
      variant: "default" as const,
      bgColor: "bg-blue-50 hover:bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Calendar,
      title: "Schedule Interview",
      description: "Book your next interview slot",
      action: "schedule-interview",
      variant: "outline" as const,
      bgColor: "bg-emerald-50 hover:bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: Building,
      title: "Browse Companies",
      description: "Explore job opportunities",
      action: "view-companies",
      variant: "outline" as const,
      bgColor: "bg-purple-50 hover:bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: TestTube,
      title: "Practice Tests",
      description: "Take mock tests and assessments",
      action: "practice-tests",
      variant: "outline" as const,
      bgColor: "bg-amber-50 hover:bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      icon: LogOut,
      title: "Logout",
      description: "Sign out of your account",
      action: "logout",
      variant: "destructive" as const,
      bgColor: "bg-red-50 hover:bg-red-100",
      iconColor: "text-red-600"
    }
  ];

  return (
    <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
        <CardDescription className="text-base">Frequently used actions and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className={`justify-start h-auto p-5 text-left group transition-all duration-200 ${action.bgColor}`}
              onClick={() => handleAction(action.action)}
            >
              <div className={`p-2 rounded-lg mr-4 ${action.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className={`h-5 w-5 ${action.iconColor}`} />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-base">{action.title}</span>
                <span className="text-sm opacity-70">{action.description}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
