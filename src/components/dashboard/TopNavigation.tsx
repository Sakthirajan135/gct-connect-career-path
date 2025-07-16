
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface TopNavigationProps {
  onNotificationClick?: () => void;
  notificationCount?: number;
}

export const TopNavigation = ({ onNotificationClick, notificationCount = 0 }: TopNavigationProps) => {
  const { user, logout } = useAuth();

  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      student: 'Student',
      placement_officer: 'Placement Officer',
      recruiter: 'Recruiter',
      placement_rep: 'Placement Rep',
      alumni: 'Alumni',
      department_staff: 'Department Staff',
      admin: 'Administrator'
    };
    return roleMap[role] || role;
  };

  const getRoleBadgeColor = (role: string) => {
    const colorMap: Record<string, string> = {
      student: 'bg-primary/20 text-primary border-primary/30',
      placement_officer: 'bg-purple-100 text-purple-800 border-purple-300',
      recruiter: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      placement_rep: 'bg-orange-100 text-orange-800 border-orange-300',
      alumni: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      department_staff: 'bg-pink-100 text-pink-800 border-pink-300',
      admin: 'bg-red-100 text-red-800 border-red-300'
    };
    return colorMap[role] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <header className="glass-card border-0 sticky top-0 z-50 shadow-lg">
      <div className="flex h-20 items-center px-8 gap-6">
        <SidebarTrigger className="h-10 w-10 rounded-xl hover:bg-muted/50" />
        
        <div className="flex-1 flex items-center gap-6">
          <div className="relative max-w-lg w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search students, companies, opportunities..."
              className="pl-12 h-12 bg-muted/30 border-0 focus:bg-background rounded-2xl text-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative h-12 w-12 rounded-2xl hover:bg-muted/50" 
            onClick={onNotificationClick}
          >
            <Bell className="h-6 w-6" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center font-semibold">
                {notificationCount}
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-4 px-4 h-12 rounded-2xl hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-lg font-semibold">{user?.name}</p>
                    <Badge variant="secondary" className={`text-sm ${getRoleBadgeColor(user?.role || '')} rounded-xl`}>
                      <Sparkles className="w-3 h-3 mr-1" />
                      {getRoleDisplayName(user?.role || '')}
                    </Badge>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 glass-card border-0 shadow-2xl rounded-2xl p-2">
              <DropdownMenuLabel className="p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-lg font-semibold">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3 rounded-xl hover:bg-muted/50 cursor-pointer">
                <User className="mr-3 h-5 w-5" />
                <span className="text-lg">Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 rounded-xl hover:bg-muted/50 cursor-pointer">
                <Settings className="mr-3 h-5 w-5" />
                <span className="text-lg">Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout} 
                className="p-3 rounded-xl hover:bg-destructive/10 text-destructive cursor-pointer"
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span className="text-lg">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
