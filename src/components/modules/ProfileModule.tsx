
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save, Edit, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ProfileModule = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    department: 'Computer Science Engineering',
    cgpa: '8.5',
    email: 'john.doe@gct.ac.in',
    phone: '+91 9876543210',
    address: '123 Main Street, Coimbatore, Tamil Nadu'
  });

  const [skills, setSkills] = useState([
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL'
  ]);
  const [newSkill, setNewSkill] = useState('');

  const [internships, setInternships] = useState([
    {
      id: 1,
      company: 'Tech Corp',
      role: 'Software Developer Intern',
      duration: '3 months',
      description: 'Worked on web development projects'
    }
  ]);

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: 'AWS Cloud Practitioner',
      provider: 'Amazon Web Services',
      date: '2024-01-15',
      credentialId: 'AWS-123456'
    }
  ]);

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }, 500);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addInternship = () => {
    const newInternship = {
      id: Date.now(),
      company: '',
      role: '',
      duration: '',
      description: ''
    };
    setInternships([...internships, newInternship]);
  };

  const updateInternship = (id: number, field: string, value: string) => {
    setInternships(internships.map(intern => 
      intern.id === id ? { ...intern, [field]: value } : intern
    ));
  };

  const removeInternship = (id: number) => {
    setInternships(internships.filter(intern => intern.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Management</h1>
          <p className="text-muted-foreground">Manage your personal and academic information</p>
        </div>
        <Button 
          onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
          className={isEditing ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <CardTitle className="text-xl">{profile.fullName}</CardTitle>
            <CardDescription>{profile.department}</CardDescription>
            <Badge variant="outline" className="mt-2 w-fit mx-auto">
              CGPA: {profile.cgpa}
            </Badge>
          </CardHeader>
        </Card>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, department: e.target.value})}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA</Label>
                  <Input
                    id="cgpa"
                    value={profile.cgpa}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, cgpa: e.target.value})}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  className={isEditing ? "" : "bg-muted"}
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 flex items-center space-x-2">
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Internships Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Internships</CardTitle>
              {isEditing && (
                <Button onClick={addInternship} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Internship
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {internships.map((internship) => (
                <div key={internship.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <Input
                        placeholder="Company Name"
                        value={internship.company}
                        disabled={!isEditing}
                        onChange={(e) => updateInternship(internship.id, 'company', e.target.value)}
                        className={isEditing ? "" : "bg-muted"}
                      />
                      <Input
                        placeholder="Role"
                        value={internship.role}
                        disabled={!isEditing}
                        onChange={(e) => updateInternship(internship.id, 'role', e.target.value)}
                        className={isEditing ? "" : "bg-muted"}
                      />
                      <Input
                        placeholder="Duration (e.g., 3 months)"
                        value={internship.duration}
                        disabled={!isEditing}
                        onChange={(e) => updateInternship(internship.id, 'duration', e.target.value)}
                        className={isEditing ? "" : "bg-muted"}
                      />
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInternship(internship.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Textarea
                    placeholder="Description of work and achievements"
                    value={internship.description}
                    disabled={!isEditing}
                    onChange={(e) => updateInternship(internship.id, 'description', e.target.value)}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
