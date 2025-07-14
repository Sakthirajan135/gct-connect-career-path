
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Building, Calendar, MapPin, DollarSign, Users, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CompanyBrowser = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterCGPA, setFilterCGPA] = useState('all');
  
  const [companies] = useState([
    {
      id: 1,
      name: 'TCS',
      role: 'Software Developer',
      salary: '4.5 LPA',
      location: 'Chennai',
      eligibleDepartments: ['CSE', 'IT', 'ECE'],
      minCGPA: 7.0,
      driveDate: '2024-02-15',
      lastDateToApply: '2024-02-10',
      description: 'Leading IT services company offering full-stack development opportunities',
      requirements: 'Strong programming skills in Java/Python, Good communication skills',
      vacancies: 50,
      applied: false
    },
    {
      id: 2,
      name: 'Infosys',
      role: 'System Engineer',
      salary: '3.8 LPA',
      location: 'Bangalore',
      eligibleDepartments: ['CSE', 'IT'],
      minCGPA: 6.5,
      driveDate: '2024-02-20',
      lastDateToApply: '2024-02-15',
      description: 'Digital transformation and consulting services',
      requirements: 'Knowledge of software development lifecycle, Problem-solving skills',
      vacancies: 30,
      applied: true
    },
    {
      id: 3,
      name: 'Wipro',
      role: 'Frontend Developer',
      salary: '4.2 LPA',
      location: 'Hyderabad',
      eligibleDepartments: ['CSE', 'IT', 'ECE'],
      minCGPA: 7.5,
      driveDate: '2024-02-25',
      lastDateToApply: '2024-02-20',
      description: 'Global IT consulting and system integration services',
      requirements: 'React.js, JavaScript, HTML/CSS, Responsive design',
      vacancies: 25,
      applied: false
    },
    {
      id: 4,
      name: 'Cognizant',
      role: 'Data Analyst',
      salary: '5.0 LPA',
      location: 'Mumbai',
      eligibleDepartments: ['CSE', 'IT', 'MECH'],
      minCGPA: 8.0,
      driveDate: '2024-03-01',
      lastDateToApply: '2024-02-25',
      description: 'Digital business transformation and technology services',
      requirements: 'Python, SQL, Data visualization tools, Statistical analysis',
      vacancies: 15,
      applied: false
    },
    {
      id: 5,
      name: 'Accenture',
      role: 'Software Engineer',
      salary: '4.8 LPA',
      location: 'Pune',
      eligibleDepartments: ['CSE', 'IT'],
      minCGPA: 7.0,
      driveDate: '2024-03-05',
      lastDateToApply: '2024-02-28',
      description: 'Professional services company with capabilities in digital, cloud and security',
      requirements: 'Object-oriented programming, Database knowledge, Agile methodology',
      vacancies: 40,
      applied: false
    }
  ]);

  const [appliedCompanies, setAppliedCompanies] = useState(new Set([2]));

  const studentProfile = {
    department: 'CSE',
    cgpa: 8.5
  };

  const isEligible = (company: any) => {
    return company.eligibleDepartments.includes(studentProfile.department) && 
           studentProfile.cgpa >= company.minCGPA;
  };

  const applyToCompany = (companyId: number, companyName: string) => {
    setAppliedCompanies(new Set([...appliedCompanies, companyId]));
    
    toast({
      title: "Application Submitted",
      description: `Successfully applied to ${companyName}`,
    });
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || 
                             company.eligibleDepartments.includes(filterDepartment);
    
    const matchesCGPA = filterCGPA === 'all' || 
                       (filterCGPA === 'eligible' && isEligible(company)) ||
                       (filterCGPA === 'not-eligible' && !isEligible(company));
    
    return matchesSearch && matchesDepartment && matchesCGPA;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Browser</h1>
          <p className="text-muted-foreground">Explore upcoming placement drives and apply</p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies or roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="CSE">Computer Science</SelectItem>
              <SelectItem value="IT">Information Technology</SelectItem>
              <SelectItem value="ECE">Electronics</SelectItem>
              <SelectItem value="MECH">Mechanical</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterCGPA} onValueChange={setFilterCGPA}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by eligibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="eligible">Eligible for Me</SelectItem>
              <SelectItem value="not-eligible">Not Eligible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{companies.length}</div>
            <div className="text-sm text-muted-foreground">Total Drives</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {companies.filter(c => isEligible(c)).length}
            </div>
            <div className="text-sm text-muted-foreground">Eligible</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{appliedCompanies.size}</div>
            <div className="text-sm text-muted-foreground">Applied</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {companies.reduce((sum, c) => sum + c.vacancies, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Vacancies</div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => {
          const eligible = isEligible(company);
          const hasApplied = appliedCompanies.has(company.id);
          
          return (
            <Card key={company.id} 
                  className={`border-0 shadow-lg hover:shadow-xl transition-all ${
                    !eligible ? 'opacity-60' : ''
                  }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <CardDescription>{company.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant={eligible ? "default" : "secondary"}>
                      {eligible ? "Eligible" : "Not Eligible"}
                    </Badge>
                    {hasApplied && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Applied
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{company.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{company.driveDate}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{company.vacancies} positions</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">{company.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Requirements</h4>
                  <p className="text-sm text-muted-foreground">{company.requirements}</p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    <strong>Eligible Departments:</strong> {company.eligibleDepartments.join(', ')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Minimum CGPA:</strong> {company.minCGPA}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Last Date to Apply:</strong> {company.lastDateToApply}
                  </div>
                </div>

                <Button 
                  className="w-full"
                  disabled={!eligible || hasApplied}
                  onClick={() => applyToCompany(company.id, company.name)}
                  variant={hasApplied ? "outline" : "default"}
                >
                  {hasApplied ? "Applied" : !eligible ? "Not Eligible" : "Apply Now"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No companies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find more opportunities.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
