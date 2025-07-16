
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Test Scores */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold">Test Performance</CardTitle>
          <CardDescription className="text-base">Your latest mock test scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {testScoreData.map((test, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="font-medium">{test.name}</span>
                  <span className="font-semibold text-primary">{test.score}%</span>
                </div>
                <Progress value={test.score} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Readiness Score */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center space-x-3 text-xl font-semibold">
            <Target className="h-6 w-6" />
            <span>Placement Readiness Score</span>
          </CardTitle>
          <CardDescription className="text-base">Overall assessment of your preparation level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-primary mb-3">{readinessScore}%</div>
              <div className="text-base text-muted-foreground font-medium">
                {readinessScore >= 80 ? "Excellent! You're well prepared." : 
                 readinessScore >= 60 ? "Good progress! Keep improving." : 
                 "Focus on strengthening your profile."}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground font-medium">Profile</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">78%</div>
                <div className="text-sm text-muted-foreground font-medium">Tests</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground font-medium">Applications</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">70%</div>
                <div className="text-sm text-muted-foreground font-medium">Interviews</div>
              </div>
            </div>
            
            <Progress value={readinessScore} className="h-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
