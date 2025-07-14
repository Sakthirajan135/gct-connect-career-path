
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Building, Calendar, Star, TrendingUp, TrendingDown } from 'lucide-react';

const Feedback = () => {
  const { user } = useAuth();

  if (!user) return null;

  const feedbacks = [
    {
      id: 1,
      company: 'TCS',
      role: 'Software Developer',
      date: '2024-01-15',
      interviewer: 'Rajesh Kumar',
      round: 'Technical Round',
      rating: 4,
      feedback: 'Good technical knowledge and problem-solving skills. Needs improvement in system design concepts. Communication skills are excellent. Recommend for next round.',
      strengths: ['Problem Solving', 'Communication', 'Programming Skills'],
      improvements: ['System Design', 'Database Knowledge'],
      status: 'Selected'
    },
    {
      id: 2,
      company: 'Infosys',
      role: 'System Engineer',
      date: '2024-01-10',
      interviewer: 'Priya Sharma',
      round: 'HR Round',
      rating: 3,
      feedback: 'Candidate shows enthusiasm and willingness to learn. Good cultural fit for the organization. However, needs to work on confidence and presentation skills.',
      strengths: ['Enthusiasm', 'Learning Attitude', 'Team Player'],
      improvements: ['Confidence', 'Presentation Skills'],
      status: 'On Hold'
    },
    {
      id: 3,
      company: 'Wipro',
      role: 'Frontend Developer',
      date: '2024-01-05',
      interviewer: 'Amit Patel',
      round: 'Technical Round',
      rating: 2,
      feedback: 'Limited knowledge of advanced JavaScript concepts. Struggled with React component lifecycle questions. Good basics but needs more practical experience.',
      strengths: ['HTML/CSS', 'Basic JavaScript'],
      improvements: ['React.js', 'Advanced JavaScript', 'Practical Experience'],
      status: 'Rejected'
    },
    {
      id: 4,
      company: 'Cognizant',
      role: 'Data Analyst',
      date: '2024-01-20',
      interviewer: 'Sunita Reddy',
      round: 'Technical Round',
      rating: 5,
      feedback: 'Excellent analytical skills and strong foundation in statistics. Demonstrated practical knowledge of data visualization tools. Very impressive performance.',
      strengths: ['Statistical Analysis', 'Data Visualization', 'Python', 'SQL'],
      improvements: ['Machine Learning', 'Big Data Tools'],
      status: 'Selected'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selected': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getOverallStats = () => {
    const totalFeedbacks = feedbacks.length;
    const averageRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks;
    const selected = feedbacks.filter(f => f.status === 'Selected').length;
    const rejected = feedbacks.filter(f => f.status === 'Rejected').length;
    
    return { totalFeedbacks, averageRating, selected, rejected };
  };

  const stats = getOverallStats();

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recruiter Feedback</h1>
            <p className="text-muted-foreground">Review feedback from your interviews to improve performance</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalFeedbacks}</p>
                  <p className="text-xs text-muted-foreground">Total Feedbacks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.selected}</p>
                  <p className="text-xs text-muted-foreground">Selected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-6">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feedback.company}</CardTitle>
                      <CardDescription>{feedback.role} - {feedback.round}</CardDescription>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{feedback.date}</span>
                        <span className="text-sm text-muted-foreground">• Interviewer: {feedback.interviewer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(feedback.status)}>
                      {feedback.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getRatingStars(feedback.rating)}
                      <span className="text-sm text-muted-foreground ml-2">({feedback.rating}/5)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Detailed Feedback</h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {feedback.feedback}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-green-700">Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {feedback.strengths.map((strength, index) => (
                        <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-orange-700">Areas for Improvement</h4>
                    <div className="flex flex-wrap gap-2">
                      {feedback.improvements.map((improvement, index) => (
                        <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                          {improvement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Improvement Suggestions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Areas to Focus On</CardTitle>
            <CardDescription>Based on your feedback history, here are key areas for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Technical Skills</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• System Design Concepts</li>
                  <li>• Advanced JavaScript</li>
                  <li>• Database Knowledge</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Soft Skills</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Presentation Skills</li>
                  <li>• Confidence Building</li>
                  <li>• Communication</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Your Strengths</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Problem Solving</li>
                  <li>• Learning Attitude</li>
                  <li>• Team Collaboration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
