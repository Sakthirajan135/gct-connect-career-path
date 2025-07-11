
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

const Resume = () => {
  const { user } = useAuth();
  const [dragActive, setDragActive] = useState(false);

  if (!user) return null;

  const resumes = [
    {
      id: 1,
      name: 'Software_Developer_Resume.pdf',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      status: 'active',
      downloads: 12,
      views: 45
    },
    {
      id: 2,
      name: 'Internship_Resume.pdf',
      uploadDate: '2024-01-10',
      size: '1.8 MB',
      status: 'draft',
      downloads: 3,
      views: 8
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resume Manager</h1>
            <p className="text-muted-foreground">Upload and manage your resumes for job applications</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Resume
          </Button>
        </div>

        {/* Upload Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
            <CardDescription>Upload your resume in PDF format (Max 5MB)</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drag and drop your resume here</h3>
              <p className="text-muted-foreground mb-4">or click to browse files</p>
              <Button variant="outline">
                Choose File
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: PDF • Max size: 5MB
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Resume Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Total Resumes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">53</p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-xs text-muted-foreground">Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resume List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Your Resumes</CardTitle>
            <CardDescription>Manage your uploaded resumes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{resume.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Uploaded {resume.uploadDate}</span>
                      <span>{resume.size}</span>
                      <span>{resume.views} views</span>
                      <span>{resume.downloads} downloads</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={resume.status === 'active' ? 'default' : 'secondary'}>
                    {resume.status === 'active' ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Draft
                      </>
                    )}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resume Tips */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Resume Tips</CardTitle>
            <CardDescription>Make your resume stand out</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Essential Sections</h4>
                <div className="space-y-2">
                  {[
                    { item: 'Contact Information', completed: true },
                    { item: 'Professional Summary', completed: true },
                    { item: 'Work Experience', completed: false },
                    { item: 'Education', completed: true },
                    { item: 'Skills & Technologies', completed: true },
                    { item: 'Projects', completed: false },
                  ].map((section, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      {section.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                      <span className={`text-sm ${section.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {section.item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Resume Score</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Score</span>
                    <span className="font-medium">75/100</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Add work experience and projects to improve your score
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Resume;
