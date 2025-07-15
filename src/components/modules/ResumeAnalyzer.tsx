
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Star,
  Target,
  Award
} from 'lucide-react';

interface ResumeAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  keywords: number;
  sections: string[];
  readability: number;
}

interface ResumeAnalyzerProps {
  fileName: string;
  analysis?: ResumeAnalysis;
}

export const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ fileName, analysis }) => {
  // Mock ML analysis - in real app, this would come from ML service
  const mockAnalysis: ResumeAnalysis = analysis || {
    score: 78,
    strengths: [
      "Well-structured format with clear sections",
      "Quantified achievements with specific metrics",
      "Strong technical skills section",
      "Professional email address",
      "Good use of action verbs"
    ],
    weaknesses: [
      "Missing professional summary",
      "No GitHub profile link",
      "Limited project descriptions",
      "No certifications mentioned",
      "Generic objective statement"
    ],
    improvements: [
      "Add a compelling professional summary at the top",
      "Include GitHub profile to showcase coding projects",
      "Expand project descriptions with technical details",
      "Add relevant certifications or courses completed",
      "Replace generic objective with specific career goals",
      "Include volunteer work or leadership experience"
    ],
    keywords: 15,
    sections: ["Contact", "Education", "Experience", "Skills", "Projects"],
    readability: 85
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Resume Analysis for {fileName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(mockAnalysis.score)} mb-2`}>
                {mockAnalysis.score}/100
              </div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{mockAnalysis.keywords}</div>
                <div className="text-xs text-muted-foreground">Keywords</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{mockAnalysis.sections.length}</div>
                <div className="text-xs text-muted-foreground">Sections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{mockAnalysis.readability}%</div>
                <div className="text-xs text-muted-foreground">Readability</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Content Quality</span>
              <span className="font-medium">{mockAnalysis.score}%</span>
            </div>
            <Progress value={mockAnalysis.score} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>Strengths</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAnalysis.strengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weaknesses */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>Areas of Concern</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAnalysis.weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-start space-x-3">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{weakness}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvements */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-600">
            <TrendingUp className="h-5 w-5" />
            <span>Recommended Improvements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAnalysis.improvements.map((improvement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{improvement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Score Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Format & Structure</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Content Quality</span>
                <span className="font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Keyword Optimization</span>
                <span className="font-medium">70%</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Professional Impact</span>
                <span className="font-medium">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
