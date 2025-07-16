
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Upload,
  Save,
  Camera
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ProfileModule = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 9876543210',
    location: 'Mumbai, Maharashtra',
    dateOfBirth: '1999-05-15',
    bio: 'Final year Computer Science student passionate about software development and artificial intelligence.',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'MongoDB'],
    education: 'B.Tech Computer Science Engineering',
    college: 'Indian Institute of Technology',
    graduation: '2024'
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        toast({
          title: "Profile image updated",
          description: "Your profile picture has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Here you would typically save to a backend
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Profile Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileImage || undefined} alt="Profile" />
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {getInitials(profileData.name)}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="profile-upload" 
                className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.education}</p>
              <p className="text-sm text-muted-foreground">{profileData.college}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                {profileData.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
                {profileData.skills.length > 3 && (
                  <Badge variant="outline">+{profileData.skills.length - 3} more</Badge>
                )}
              </div>
            </div>
            
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="education">Degree</Label>
              <Input
                id="education"
                value={profileData.education}
                onChange={(e) => setProfileData({...profileData, education: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="college">College/University</Label>
              <Input
                id="college"
                value={profileData.college}
                onChange={(e) => setProfileData({...profileData, college: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="graduation">Graduation Year</Label>
              <Input
                id="graduation"
                value={profileData.graduation}
                onChange={(e) => setProfileData({...profileData, graduation: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle>Skills & Expertise</CardTitle>
          <CardDescription>Your technical and professional skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={handleSave} className="px-8">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};
