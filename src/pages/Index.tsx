
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Building, Award, Calendar, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Users,
      title: 'Student Management',
      description: 'Comprehensive student profiles with advanced analytics and tracking capabilities'
    },
    {
      icon: Building,
      title: 'Recruiter Portal',
      description: 'Streamlined access to talent with AI-powered matching and filtering'
    },
    {
      icon: Calendar,
      title: 'Drive Management',
      description: 'Intelligent scheduling and coordination for seamless placement drives'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights with predictive analytics and performance metrics'
    },
    {
      icon: Award,
      title: 'Alumni Network',
      description: 'Connect with industry professionals for mentorship and career guidance'
    },
    {
      icon: GraduationCap,
      title: 'Skill Development',
      description: 'AI-powered preparation resources and personalized learning paths'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Modern Header */}
      <header className="relative bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/b75a91d7-8353-4123-80aa-bb9180fc75f3.png" 
                  alt="GCT Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">GCT Placement Portal</h1>
                <p className="text-sm text-muted-foreground font-medium">Government College of Technology</p>
              </div>
            </div>
            <Link to="/login">
              <Button className="modern-button">
                Sign In <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-5"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="h-8 w-8 text-primary mr-3" />
            <span className="text-xl font-semibold text-primary">Next Generation Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            LET'S RIDE THE
            <br />
            <span className="text-gradient">FUTURE</span>
          </h1>
          
          <p className="text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto font-medium">
            Revolutionary placement management system designed with cutting-edge technology 
            to transform the entire recruitment ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/login">
              <Button size="lg" className="modern-button text-xl px-12 py-6">
                GET STARTED
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-12 py-6 text-xl rounded-2xl border-2 hover:bg-muted/50 font-semibold">
              EXPLORE FEATURES
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gradient mb-6">
              Everything You Need for Success
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Comprehensive tools powered by AI and modern design for all stakeholders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card floating-element group border-0 p-8">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-8">
            Ready to Transform Your Career Journey?
          </h2>
          <p className="text-2xl text-white/90 mb-12 font-medium">
            Join thousands of students and recruiters who trust our platform for success.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-12 py-6 text-xl rounded-2xl font-bold shadow-2xl">
              START YOUR JOURNEY
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-card/80 backdrop-blur-xl border-t border-border/50 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/b75a91d7-8353-4123-80aa-bb9180fc75f3.png" 
                alt="GCT Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <h3 className="text-3xl font-bold text-gradient">GCT Placement Portal</h3>
          </div>
          <p className="text-xl text-muted-foreground mb-8 font-medium">
            Empowering students and connecting talent with opportunities
          </p>
          <p className="text-muted-foreground">
            © 2024 Government College of Technology. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
