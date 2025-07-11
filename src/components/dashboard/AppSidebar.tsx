
import React from 'react';
import { 
  User, 
  Calendar, 
  FileText, 
  BarChart3, 
  Users, 
  Building, 
  Award, 
  Settings,
  Home,
  Briefcase,
  Upload,
  MessageCircle,
  Clock
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  userRole: string;
}

const roleMenuItems = {
  student: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'My Profile', url: '/profile', icon: User },
    { title: 'Job Applications', url: '/applications', icon: Briefcase },
    { title: 'Upload Resume', url: '/resume', icon: Upload },
    { title: 'Mock Tests', url: '/tests', icon: FileText },
    { title: 'Interview Prep', url: '/prep', icon: MessageCircle },
    { title: 'Placement Calendar', url: '/calendar', icon: Calendar },
  ],
  placement_officer: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Drive Management', url: '/drives', icon: Calendar },
    { title: 'Recruiter Coordination', url: '/recruiters', icon: Building },
    { title: 'Analytics', url: '/analytics', icon: BarChart3 },
    { title: 'Student Database', url: '/students', icon: Users },
    { title: 'Reports', url: '/reports', icon: FileText },
  ],
  recruiter: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Student Profiles', url: '/profiles', icon: Users },
    { title: 'Schedule Interviews', url: '/interviews', icon: Calendar },
    { title: 'Feedback Forms', url: '/feedback', icon: MessageCircle },
    { title: 'Job Postings', url: '/postings', icon: Briefcase },
  ],
  placement_rep: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Peer Tracking', url: '/tracking', icon: Users },
    { title: 'Drive Coordination', url: '/coordination', icon: Calendar },
    { title: 'Reminders', url: '/reminders', icon: Clock },
    { title: 'Reports', url: '/reports', icon: FileText },
  ],
  alumni: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Interview Stories', url: '/stories', icon: MessageCircle },
    { title: 'Mentorship', url: '/mentorship', icon: Award },
    { title: 'Mock Interviews', url: '/mock-interviews', icon: Calendar },
    { title: 'Career Guidance', url: '/guidance', icon: FileText },
  ],
  department_staff: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Department Analytics', url: '/dept-analytics', icon: BarChart3 },
    { title: 'Student Mentoring', url: '/mentoring', icon: Users },
    { title: 'Readiness Reports', url: '/readiness', icon: FileText },
    { title: 'Performance Metrics', url: '/metrics', icon: Award },
  ],
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'System Management', url: '/system', icon: Settings },
    { title: 'User Management', url: '/users', icon: Users },
    { title: 'Content Upload', url: '/content', icon: Upload },
    { title: 'Security', url: '/security', icon: Award },
    { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  ],
};

export const AppSidebar = ({ userRole }: AppSidebarProps) => {
  const menuItems = roleMenuItems[userRole as keyof typeof roleMenuItems] || [];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">GCT</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Placement Portal</h2>
            <p className="text-sm text-gray-500 capitalize">{userRole.replace('_', ' ')}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
