
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
  Clock,
  GraduationCap,
  Target,
  TrendingUp,
  Shield,
  Database
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
    { title: 'Dashboard', url: '/dashboard', icon: Home, description: 'Overview & Stats' },
    { title: 'My Profile', url: '/profile', icon: User, description: 'Personal Information' },
    { title: 'Job Applications', url: '/applications', icon: Briefcase, description: 'Track Applications' },
    { title: 'Resume Builder', url: '/resume', icon: Upload, description: 'Upload & Manage' },
    { title: 'Mock Tests', url: '/tests', icon: FileText, description: 'Practice Tests' },
    { title: 'Interview Prep', url: '/prep', icon: MessageCircle, description: 'Interview Guide' },
    { title: 'Placement Calendar', url: '/calendar', icon: Calendar, description: 'Important Dates' },
  ],
  placement_officer: [
    { title: 'Dashboard', url: '/dashboard', icon: Home, description: 'System Overview' },
    { title: 'Drive Management', url: '/drives', icon: Calendar, description: 'Manage Drives' },
    { title: 'Recruiter Portal', url: '/recruiters', icon: Building, description: 'Company Relations' },
    { title: 'Analytics Hub', url: '/analytics', icon: BarChart3, description: 'Performance Metrics' },
    { title: 'Student Database', url: '/students', icon: Users, description: 'Student Records' },
    { title: 'Reports Center', url: '/reports', icon: FileText, description: 'Generate Reports' },
  ],
  recruiter: [
    { title: 'Dashboard', url: '/dashboard', icon: Home, description: 'Recruitment Hub' },
    { title: 'Student Profiles', url: '/profiles', icon: Users, description: 'Browse Candidates' },
    { title: 'Interview Scheduler', url: '/interviews', icon: Calendar, description: 'Schedule Interviews' },
    { title: 'Feedback Portal', url: '/feedback', icon: MessageCircle, description: 'Submit Feedback' },
    { title: 'Job Postings', url: '/postings', icon: Briefcase, description: 'Manage Postings' },
  ],
  placement_rep: [
    { title: 'Dashboard', url: '/dashboard', icon: Home, description: 'Rep Dashboard' },
    { title: 'Peer Tracking', url: '/tracking', icon: Users, description: 'Monitor Peers' },
    { title: 'Drive Coordination', url: '/coordination', icon: Calendar, description: 'Coordinate Events' },
    { title: 'Reminder System', url: '/reminders', icon: Clock, description: 'Send Reminders' },
    { title: 'Progress Reports', url: '/reports', icon: FileText, description: 'Track Progress' },
  ],
  alumni: [
    { title: 'Dashboard', url: '/dashboard', icon: Home, description: 'Alumni Hub' },
    { title: 'Success Stories', url: '/stories', icon: MessageCircle, description: 'Share Experiences' },
    { title: 'Mentorship Hub', url: '/mentorship', icon: Award, description: 'Mentor Students' },
    { title: 'Mock Interviews', url: '/mock-interviews', icon: Calendar, description: 'Conduct Sessions' },
    { title: 'Career Guidance', url: '/guidance', icon: FileText, description: 'Career Advice' },
  ],
  department_staff: [
    { title: 'Dashboard', url: '/dashboard', icon: Home, description: 'Department View' },
    { title: 'Analytics Center', url: '/dept-analytics', icon: BarChart3, description: 'Department Stats' },
    { title: 'Student Mentoring', url: '/mentoring', icon: Users, description: 'Academic Guidance' },
    { title: 'Readiness Reports', url: '/readiness', icon: FileText, description: 'Student Readiness' },
    { title: 'Performance Metrics', url: '/metrics', icon: Award, description: 'Track Performance' },
  ],
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: Home, description: 'System Control' },
    { title: 'System Management', url: '/system', icon: Settings, description: 'System Settings' },
    { title: 'User Management', url: '/users', icon: Users, description: 'Manage Users' },
    { title: 'Content Manager', url: '/content', icon: Upload, description: 'Upload Content' },
    { title: 'Security Center', url: '/security', icon: Shield, description: 'Security Settings' },
    { title: 'Analytics Suite', url: '/analytics', icon: BarChart3, description: 'System Analytics' },
  ],
};

export const AppSidebar = ({ userRole }: AppSidebarProps) => {
  const { user } = useAuth();
  const menuItems = roleMenuItems[userRole as keyof typeof roleMenuItems] || [];

  return (
    <Sidebar className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="text-primary-foreground w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              GCT Placement
            </h2>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {userRole.replace('_', ' ')}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg">
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                          isActive 
                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-foreground'}`} />
                          <div className="flex-1 min-w-0">
                            <span className="block truncate">{item.title}</span>
                            <span className={`text-xs truncate block ${isActive ? 'text-primary/70' : 'text-muted-foreground'}`}>
                              {item.description}
                            </span>
                          </div>
                        </>
                      )}
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
