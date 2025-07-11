
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

const userRoles = [
  { value: 'student', label: 'Student', description: 'Access placement resources and track applications' },
  { value: 'placement_officer', label: 'Placement Officer', description: 'Manage drives and coordinate with recruiters' },
  { value: 'recruiter', label: 'Recruiter / HR', description: 'Access student profiles and schedule interviews' },
  { value: 'placement_rep', label: 'Placement Representative', description: 'Coordinate with peers and track drives' },
  { value: 'alumni', label: 'Alumni / Senior', description: 'Share experiences and mentor students' },
  { value: 'department_staff', label: 'Department Staff / HoD', description: 'Monitor department performance and mentor' },
  { value: 'admin', label: 'Admin / Developer', description: 'System maintenance and security management' }
];

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic with Supabase
    console.log('Login attempt:', { email, role: selectedRole });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">GCT Placement Portal</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sign in to access your placement dashboard
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                Select Your Role
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{role.label}</span>
                        <span className="text-xs text-gray-500">{role.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5"
              disabled={!selectedRole || !email || !password}
            >
              Sign In
            </Button>
          </form>

          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
              Forgot your password?
            </a>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                Contact Admin
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
