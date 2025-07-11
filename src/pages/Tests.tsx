
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Play, CheckCircle, Book, Target, Award } from 'lucide-react';

const Tests = () => {
  const { user } = useAuth();

  if (!user) return null;

  const tests = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Test your basic JavaScript knowledge',
      duration: '30 mins',
      questions: 25,
      difficulty: 'Beginner',
      completed: true,
      score: 85
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      description: 'Advanced DSA concepts and problem solving',
      duration: '45 mins',
      questions: 30,
      difficulty: 'Advanced',
      completed: false,
      score: null
    },
    {
      id: 3,
      title: 'System Design Basics',
      description: 'Introduction to system design principles',
      duration: '60 mins',
      questions: 20,
      difficulty: 'Intermediate',
      completed: true,
      score: 78
    }
  ];

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mock Tests</h1>
            <p className="text-muted-foreground">Practice tests to improve your technical skills</p>
          </div>
        </div>

        {/* Test Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Book className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-xs text-muted-foreground">Available Tests</p>
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
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">82%</p>
                  <p className="text-xs text-muted-foreground">Average Score</p>
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
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Hours Practiced</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription className="mt-1">{test.description}</CardDescription>
                  </div>
                  {test.completed && (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{test.duration}</span>
                  </div>
                  <span>{test.questions} questions</span>
                  <Badge variant="outline" className={
                    test.difficulty === 'Beginner' ? 'border-green-200 text-green-700' :
                    test.difficulty === 'Intermediate' ? 'border-yellow-200 text-yellow-700' :
                    'border-red-200 text-red-700'
                  }>
                    {test.difficulty}
                  </Badge>
                </div>
                
                {test.completed && test.score && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Score</span>
                      <span className="font-medium">{test.score}%</span>
                    </div>
                    <Progress value={test.score} className="h-2" />
                  </div>
                )}
                
                <Button className="w-full" variant={test.completed ? "outline" : "default"}>
                  <Play className="h-4 w-4 mr-2" />
                  {test.completed ? 'Retake Test' : 'Start Test'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tests;
