
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Building, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

const Applications = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) return null;

  const applications = [
    {
      id: 1,
      company: 'Tata Consultancy Services',
      role: 'Software Engineer',
      location: 'Chennai',
      appliedDate: '2024-01-15',
      status: 'interview_scheduled',
      salary: '₹3.5 LPA',
      nextStep: 'Technical Interview on Jan 20'
    },
    {
      id: 2,
      company: 'Infosys Limited',
      role: 'Systems Engineer',
      location: 'Bangalore',
      appliedDate: '2024-01-12',
      status: 'under_review',
      salary: '₹3.2 LPA',
      nextStep: 'Waiting for response'
    },
    {
      id: 3,
      company: 'Wipro Technologies',
      role: 'Project Engineer',
      location: 'Hyderabad',
      appliedDate: '2024-01-10',
      status: 'selected',
      salary: '₹3.8 LPA',
      nextStep: 'Offer letter received'
    },
    {
      id: 4,
      company: 'HCL Technologies',
      role: 'Software Developer',
      location: 'Chennai',
      appliedDate: '2024-01-08',
      status: 'rejected',
      salary: '₹3.4 LPA',
      nextStep: 'Application closed'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      interview_scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Interview Scheduled', icon: Calendar },
      under_review: { color: 'bg-yellow-100 text-yellow-800', label: 'Under Review', icon: Clock },
      selected: { color: 'bg-green-100 text-green-800', label: 'Selected', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected', icon: XCircle },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.under_review;
  };

  const filteredApplications = applications.filter(app =>
    app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
            <p className="text-muted-foreground">Track and manage your job applications</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Total Applied</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Selected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Interviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredApplications.map((application) => {
              const statusInfo = getStatusBadge(application.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <Card key={application.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                            <Building className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{application.company}</h3>
                            <p className="text-muted-foreground">{application.role}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{application.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Applied {application.appliedDate}</span>
                              </div>
                              <span className="font-medium text-foreground">{application.salary}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Badge className={`${statusInfo.color} flex items-center space-x-1`}>
                            <StatusIcon className="h-3 w-3" />
                            <span>{statusInfo.label}</span>
                          </Badge>
                          <p className="text-sm text-muted-foreground">{application.nextStep}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Update Status</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="active">
            {/* Filter for active applications */}
            <div className="text-center py-8">
              <p className="text-muted-foreground">Active applications will be shown here</p>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            {/* Filter for completed applications */}
            <div className="text-center py-8">
              <p className="text-muted-foreground">Completed applications will be shown here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
