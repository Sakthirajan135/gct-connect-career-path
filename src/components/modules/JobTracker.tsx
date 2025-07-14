
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Calendar, MapPin, DollarSign, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const JobTracker = () => {
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: 'TCS',
      role: 'Software Developer',
      appliedDate: '2024-01-15',
      status: 'applied',
      salary: '4.5 LPA',
      location: 'Chennai',
      description: 'Full-stack development role with modern technologies',
      requirements: 'React, Node.js, MongoDB',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      company: 'Infosys',
      role: 'System Engineer',
      appliedDate: '2024-01-10',
      status: 'shortlisted',
      salary: '3.8 LPA',
      location: 'Bangalore',
      description: 'Systems engineering role with cloud technologies',
      requirements: 'Java, Spring Boot, AWS',
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      company: 'Wipro',
      role: 'Frontend Developer',
      appliedDate: '2024-01-05',
      status: 'rejected',
      salary: '4.2 LPA',
      location: 'Hyderabad',
      description: 'Frontend development with React and TypeScript',
      requirements: 'React, TypeScript, CSS',
      lastUpdated: '2024-01-08'
    },
    {
      id: 4,
      company: 'Cognizant',
      role: 'Data Analyst',
      appliedDate: '2024-01-20',
      status: 'selected',
      salary: '5.0 LPA',
      location: 'Mumbai',
      description: 'Data analysis and visualization role',
      requirements: 'Python, SQL, Power BI',
      lastUpdated: '2024-01-18'
    }
  ]);

  const updateApplicationStatus = (id: number, newStatus: string) => {
    setApplications(applications.map(app => 
      app.id === id 
        ? { ...app, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : app
    ));
    
    toast({
      title: "Status Updated",
      description: `Application status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'selected': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = filterStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  const getStats = () => {
    return {
      total: applications.length,
      applied: applications.filter(app => app.status === 'applied').length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      selected: applications.filter(app => app.status === 'selected').length,
      rejected: applications.filter(app => app.status === 'rejected').length
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Application Tracker</h1>
          <p className="text-muted-foreground">Track and manage your job applications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="selected">Selected</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
            <div className="text-sm text-muted-foreground">Applied</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.shortlisted}</div>
            <div className="text-sm text-muted-foreground">Shortlisted</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.selected}</div>
            <div className="text-sm text-muted-foreground">Selected</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{application.company}</CardTitle>
                    <CardDescription>{application.role}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(application.status)}>
                  {application.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{application.salary}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{application.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Applied: {application.appliedDate}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{application.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Requirements</h4>
                <p className="text-sm text-muted-foreground">{application.requirements}</p>
              </div>

              <div className="pt-2 border-t">
                <div className="text-xs text-muted-foreground mb-2">
                  Last updated: {application.lastUpdated}
                </div>
                <Select 
                  value={application.status} 
                  onValueChange={(value) => updateApplicationStatus(application.id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No applications found</h3>
            <p className="text-muted-foreground">
              {filterStatus === 'all' 
                ? "You haven't applied to any jobs yet. Start browsing companies to find opportunities!"
                : `No applications with status "${filterStatus}" found.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
