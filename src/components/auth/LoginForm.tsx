
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, GraduationCap, Loader2, Sparkles } from 'lucide-react';

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
  const [errors, setErrors] = useState<{ email?: string; password?: string; role?: string }>({});
  
  const { login, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; role?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!selectedRole) {
      newErrors.role = 'Please select your role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await login(email, password, selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      
      <Card className="w-full max-w-lg glass-card border-0 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-primary">Welcome Back</span>
            </div>
            <CardTitle className="text-4xl font-bold text-gradient">
              GCT Placement Portal
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground font-medium">
              Sign in to access your placement dashboard
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="role" className="text-lg font-semibold text-foreground">
                Select Your Role
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className={`modern-select ${errors.role ? 'ring-2 ring-destructive' : ''}`}>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent className="glass-card border-0 shadow-2xl">
                  {userRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value} className="py-4">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-lg">{role.label}</span>
                        <span className="text-sm text-muted-foreground">{role.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-destructive font-medium">{errors.role}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-lg font-semibold text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`modern-input ${errors.email ? 'ring-2 ring-destructive' : ''}`}
              />
              {errors.email && <p className="text-sm text-destructive font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-lg font-semibold text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`modern-input pr-14 ${errors.password ? 'ring-2 ring-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive font-medium">{errors.password}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full modern-button text-xl py-6 mt-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="text-center space-y-6">
            <a href="#" className="text-lg text-primary hover:text-primary/80 hover:underline font-medium transition-colors">
              Forgot your password?
            </a>

            <div className="pt-6 border-t border-border/50">
              <p className="text-lg text-muted-foreground">
                Don't have an account?{' '}
                <a href="#" className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors">
                  Contact Admin
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
