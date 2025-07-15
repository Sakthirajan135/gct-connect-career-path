
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Building, 
  Calendar, 
  LogOut,
  User
} from 'lucide-react';

export const QuickActions = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUploadResume = () => {
    navigate('/resume');
    toast({
      title: "Redirecting to Resume Manager",
      description: "Upload and manage your resumes here.",
    });
  };

  const handleMockTest = () => {
    navigate('/tests');
    toast({
      title: "Redirecting to Mock Tests",
      description: "Take practice tests to improve your skills.",
    });
  };

  const handleBrowseCompanies = () => {
    navigate('/companies');
    toast({
      title: "Redirecting to Companies",
      description: "Browse available companies and opportunities.",
    });
  };

  const handleViewCalendar = () => {
    navigate('/calendar');
    toast({
      title: "Redirecting to Calendar",
      description: "View your placement schedule and events.",
    });
  };

  const handleViewProfile = () => {
    navigate('/profile');
    toast({
      title: "Redirecting to Profile",
      description: "Update your profile information.",
    });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="h-20 flex flex-col space-y-2"
            onClick={handleUploadResume}
          >
            <Upload className="h-6 w-6" />
            <span className="text-sm">Upload Resume</span>
          </Button>
          <Button 
            className="h-20 flex flex-col space-y-2" 
            variant="outline"
            onClick={handleMockTest}
          >
            <FileText className="h-6 w-6" />
            <span className="text-sm">Take Mock Test</span>
          </Button>
          <Button 
            className="h-20 flex flex-col space-y-2" 
            variant="outline"
            onClick={handleBrowseCompanies}
          >
            <Building className="h-6 w-6" />
            <span className="text-sm">Browse Companies</span>
          </Button>
          <Button 
            className="h-20 flex flex-col space-y-2" 
            variant="outline"
            onClick={handleViewCalendar}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-sm">View Calendar</span>
          </Button>
          <Button 
            className="h-20 flex flex-col space-y-2" 
            variant="outline"
            onClick={handleViewProfile}
          >
            <User className="h-6 w-6" />
            <span className="text-sm">My Profile</span>
          </Button>
          <Button 
            className="h-20 flex flex-col space-y-2" 
            variant="destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-6 w-6" />
            <span className="text-sm">Logout</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
