
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Save,
  AlertTriangle,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Resume {
  id: number;
  name: string;
  uploadDate: string;
  size: string;
  status: 'active' | 'draft';
  downloads: number;
  views: number;
  score: number;
  file?: File;
}

interface ResumeFormData {
  name: string;
  contact: string;
  education: string;
  skills: string;
  projects: string;
  experience: string;
}

const Resume = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: 1,
      name: 'Software_Developer_Resume.pdf',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      status: 'active',
      downloads: 12,
      views: 45,
      score: 85
    },
    {
      id: 2,
      name: 'Internship_Resume.pdf',
      uploadDate: '2024-01-10',
      size: '1.8 MB',
      status: 'draft',
      downloads: 3,
      views: 8,
      score: 72
    }
  ]);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [editName, setEditName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [previewResume, setPreviewResume] = useState<Resume | null>(null);
  const [formData, setFormData] = useState<ResumeFormData>({
    name: '',
    contact: '',
    education: '',
    skills: '',
    projects: '',
    experience: ''
  });

  if (!user) return null;

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
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    const newResume: Resume = {
      id: Date.now(),
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      status: 'draft',
      downloads: 0,
      views: 0,
      score: Math.floor(Math.random() * 30) + 60, // Simulate score 60-90
      file: file
    };

    setResumes([...resumes, newResume]);
    toast({
      title: "Resume uploaded successfully",
      description: `${file.name} has been uploaded and analyzed.`,
    });
  };

  const handleEditResume = (resume: Resume) => {
    setEditingResume(resume);
    setEditName(resume.name);
  };

  const handleSaveEdit = () => {
    if (editingResume) {
      setResumes(resumes.map(r => 
        r.id === editingResume.id 
          ? { ...r, name: editName }
          : r
      ));
      setEditingResume(null);
      toast({
        title: "Resume updated",
        description: "Resume details have been saved successfully.",
      });
    }
  };

  const handleDeleteResume = (id: number) => {
    setResumes(resumes.filter(r => r.id !== id));
    toast({
      title: "Resume deleted",
      description: "Resume has been removed successfully.",
    });
  };

  const handlePreview = (resume: Resume) => {
    setPreviewResume(resume);
    // Increment view count
    setResumes(resumes.map(r => 
      r.id === resume.id 
        ? { ...r, views: r.views + 1 }
        : r
    ));
  };

  const handleDownload = (resume: Resume) => {
    // Increment download count
    setResumes(resumes.map(r => 
      r.id === resume.id 
        ? { ...r, downloads: r.downloads + 1 }
        : r
    ));
    toast({
      title: "Download started",
      description: `${resume.name} is being downloaded.`,
    });
  };

  const handleCreateResume = () => {
    if (!formData.name || !formData.contact) {
      toast({
        title: "Missing required fields",
        description: "Please fill in at least name and contact information.",
        variant: "destructive",
      });
      return;
    }

    const newResume: Resume = {
      id: Date.now(),
      name: `${formData.name.replace(/\s+/g, '_')}_Resume.pdf`,
      uploadDate: new Date().toISOString().split('T')[0],
      size: '1.2 MB',
      status: 'draft',
      downloads: 0,
      views: 0,
      score: Math.floor(Math.random() * 20) + 75 // Higher score for created resumes
    };

    setResumes([...resumes, newResume]);
    setShowCreateForm(false);
    setFormData({
      name: '',
      contact: '',
      education: '',
      skills: '',
      projects: '',
      experience: ''
    });

    toast({
      title: "Resume created successfully",
      description: "Your new resume has been generated and saved.",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const totalViews = resumes.reduce((sum, resume) => sum + resume.views, 0);
  const totalDownloads = resumes.reduce((sum, resume) => sum + resume.downloads, 0);
  const averageScore = resumes.length > 0 ? Math.round(resumes.reduce((sum, resume) => sum + resume.score, 0) / resumes.length) : 0;

  const strengths = [
    "Professional formatting and layout",
    "Quantified achievements with metrics",
    "Relevant technical skills highlighted",
    "Clear contact information",
    "Consistent formatting throughout"
  ];

  const weaknesses = [
    "Missing GitHub/portfolio links",
    "Generic objective statement",
    "Limited project descriptions",
    "No certifications section"
  ];

  const improvements = [
    "Add measurable impact to experience bullets",
    "Include relevant certifications",
    "Add portfolio or GitHub links",
    "Optimize for ATS keywords",
    "Include volunteer work or leadership roles"
  ];

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resume Manager</h1>
            <p className="text-muted-foreground">Upload and manage your resumes for job applications</p>
          </div>
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Resume
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Resume from Template</DialogTitle>
                <DialogDescription>
                  Fill in your details to generate a professional resume
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact *</label>
                    <Input
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      placeholder="john@example.com | +91 9876543210"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Education</label>
                  <Textarea
                    value={formData.education}
                    onChange={(e) => setFormData({...formData, education: e.target.value})}
                    placeholder="B.Tech Computer Science, XYZ University (2020-2024)"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Skills</label>
                  <Textarea
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    placeholder="JavaScript, React, Node.js, Python, SQL"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Projects</label>
                  <Textarea
                    value={formData.projects}
                    onChange={(e) => setFormData({...formData, projects: e.target.value})}
                    placeholder="Project Name - Brief description and technologies used"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Experience</label>
                  <Textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="Company Name - Role (Duration) - Key achievements"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateResume}>
                    Create Resume
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button variant="outline" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: PDF • Max size: 5MB
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{resumes.length}</p>
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
                  <p className="text-2xl font-bold">{totalViews}</p>
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
                  <p className="text-2xl font-bold">{totalDownloads}</p>
                  <p className="text-xs text-muted-foreground">Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Award className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}</p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
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
                  <div className="flex-1">
                    {editingResume?.id === resume.id ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="max-w-sm"
                        />
                        <Button size="sm" onClick={handleSaveEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingResume(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <h4 className="font-medium">{resume.name}</h4>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Uploaded {resume.uploadDate}</span>
                      <span>{resume.size}</span>
                      <span>{resume.views} views</span>
                      <span>{resume.downloads} downloads</span>
                      <span className={`font-medium ${getScoreColor(resume.score)}`}>
                        Score: {resume.score}/100 ({getScoreDescription(resume.score)})
                      </span>
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
                    <Button variant="ghost" size="sm" onClick={() => handlePreview(resume)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(resume)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditResume(resume)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Resume</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{resume.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteResume(resume.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resume Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {weaknesses.map((weakness, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{weakness}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 text-blue-500 mr-2" />
                Improvements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {improvements.map((improvement, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{improvement}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Resume Preview Modal */}
        <Dialog open={!!previewResume} onOpenChange={() => setPreviewResume(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Preview: {previewResume?.name}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 bg-gray-100 rounded-lg p-8 text-center">
              <FileText className="h-20 w-20 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">PDF Preview would be displayed here</p>
              <p className="text-sm text-gray-500 mt-2">
                In a real implementation, this would show the actual PDF content
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Resume;
