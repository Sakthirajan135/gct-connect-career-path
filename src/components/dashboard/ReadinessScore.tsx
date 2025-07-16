
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';

export const ReadinessScore = () => {
  const { user } = useAuth();

  const calculateReadinessScore = () => {
    const profileCompleteness = user?.name && user?.email ? 95 : 60;
    const testScores = 78;
    const applicationRate = 85;
    const interviewSuccess = 70;
    
    return Math.round((profileCompleteness + testScores + applicationRate + interviewSuccess) / 4);
  };

  const readinessScore = calculateReadinessScore();

  const testScoreData = [
    { name: 'JavaScript', score: 85 },
    { name: 'DSA', score: 78 },
    { name: 'System Design', score: 65 },
    { name: 'Database', score: 90 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Test Scores */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle>Test Performance</CardTitle>
          <CardDescription>Your latest mock test scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testScoreData.map((test, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{test.name}</span>
                  <span className="font-medium">{test.score}%</span>
                </div>
                <Progress value={test.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Readiness Score */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Placement Readiness Score</span>
          </CardTitle>
          <CardDescription>Overall assessment of your preparation level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{readinessScore}%</div>
              <div className="text-muted-foreground">
                {readinessScore >= 80 ? "Excellent! You're well prepared." : 
                 readinessScore >= 60 ? "Good progress! Keep improving." : 
                 "Focus on strengthening your profile."}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Profile</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">78%</div>
                <div className="text-sm text-muted-foreground">Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">70%</div>
                <div className="text-sm text-muted-foreground">Interviews</div>
              </div>
            </div>
            
            <Progress value={readinessScore} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
