
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogOut, Mail, Shield } from 'lucide-react';

export const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      student: 'Student',
      placement_officer: 'Placement Officer',
      recruiter: 'Recruiter / HR',
      placement_rep: 'Placement Representative',
      alumni: 'Alumni / Senior',
      department_staff: 'Department Staff / HoD',
      admin: 'Admin / Developer'
    };
    return roleMap[role] || role;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold">Profile</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{getRoleDisplayName(user.role)}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Button 
            onClick={logout}
            variant="outline"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
