
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Code, 
  Cpu, 
  Wrench, 
  Zap, 
  Monitor,
  Clock,
  Users,
  Award,
  Play
} from 'lucide-react';

interface TestCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tests: Test[];
}

interface Test {
  id: string;
  title: string;
  questions: number;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  attempts: number;
  bestScore?: number;
}

export const DepartmentTests = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('general');

  const testCategories: Record<string, TestCategory[]> = {
    general: [
      {
        id: 'aptitude',
        title: 'General Aptitude',
        description: 'Quantitative, logical reasoning, and verbal ability',
        icon: Brain,
        tests: [
          { id: '1', title: 'Quantitative Aptitude - Basic', questions: 30, duration: 45, difficulty: 'Easy', attempts: 0 },
          { id: '2', title: 'Logical Reasoning - Advanced', questions: 25, duration: 40, difficulty: 'Medium', attempts: 2, bestScore: 78 },
          { id: '3', title: 'Verbal Ability - Comprehensive', questions: 35, duration: 50, difficulty: 'Hard', attempts: 1, bestScore: 65 }
        ]
      },
      {
        id: 'communication',
        title: 'Communication Skills',
        description: 'English proficiency and communication assessment',
        icon: Users,
        tests: [
          { id: '4', title: 'Grammar & Vocabulary', questions: 40, duration: 30, difficulty: 'Easy', attempts: 1, bestScore: 85 },
          { id: '5', title: 'Reading Comprehension', questions: 20, duration: 35, difficulty: 'Medium', attempts: 0 },
          { id: '6', title: 'Essay Writing Skills', questions: 5, duration: 60, difficulty: 'Hard', attempts: 0 }
        ]
      }
    ],
    cse: [
      {
        id: 'programming',
        title: 'Programming Fundamentals',
        description: 'Core programming concepts and problem solving',
        icon: Code,
        tests: [
          { id: '7', title: 'Data Structures & Algorithms', questions: 50, duration: 90, difficulty: 'Hard', attempts: 3, bestScore: 82 },
          { id: '8', title: 'Object Oriented Programming', questions: 30, duration: 60, difficulty: 'Medium', attempts: 1, bestScore: 75 },
          { id: '9', title: 'Database Management Systems', questions: 40, duration: 70, difficulty: 'Medium', attempts: 0 }
        ]
      },
      {
        id: 'webdev',
        title: 'Web Development',
        description: 'Frontend and backend web technologies',
        icon: Monitor,
        tests: [
          { id: '10', title: 'JavaScript Fundamentals', questions: 35, duration: 50, difficulty: 'Medium', attempts: 2, bestScore: 88 },
          { id: '11', title: 'React.js Development', questions: 25, duration: 45, difficulty: 'Hard', attempts: 0 },
          { id: '12', title: 'Node.js & Express', questions: 30, duration: 55, difficulty: 'Hard', attempts: 1, bestScore: 70 }
        ]
      }
    ],
    it: [
      {
        id: 'networks',
        title: 'Computer Networks',
        description: 'Networking protocols and system administration',
        icon: Zap,
        tests: [
          { id: '13', title: 'Network Protocols & OSI Model', questions: 40, duration: 60, difficulty: 'Medium', attempts: 1, bestScore: 72 },
          { id: '14', title: 'Network Security Fundamentals', questions: 35, duration: 55, difficulty: 'Hard', attempts: 0 },
          { id: '15', title: 'System Administration', questions: 30, duration: 50, difficulty: 'Medium', attempts: 0 }
        ]
      },
      {
        id: 'systems',
        title: 'Information Systems',
        description: 'Enterprise systems and IT management',
        icon: Cpu,
        tests: [
          { id: '16', title: 'Enterprise Resource Planning', questions: 25, duration: 40, difficulty: 'Medium', attempts: 0 },
          { id: '17', title: 'IT Project Management', questions: 30, duration: 45, difficulty: 'Easy', attempts: 2, bestScore: 80 },
          { id: '18', title: 'Cloud Computing Basics', questions: 35, duration: 60, difficulty: 'Hard', attempts: 0 }
        ]
      }
    ],
    mechanical: [
      {
        id: 'core',
        title: 'Core Mechanical',
        description: 'Fundamental mechanical engineering concepts',
        icon: Wrench,
        tests: [
          { id: '19', title: 'Thermodynamics', questions: 40, duration: 70, difficulty: 'Hard', attempts: 1, bestScore: 68 },
          { id: '20', title: 'Fluid Mechanics', questions: 35, duration: 65, difficulty: 'Medium', attempts: 0 },
          { id: '21', title: 'Manufacturing Processes', questions: 45, duration: 80, difficulty: 'Medium', attempts: 2, bestScore: 75 }
        ]
      },
      {
        id: 'design',
        title: 'Design & Analysis',
        description: 'CAD, simulation, and design principles',
        icon: Cpu,
        tests: [
          { id: '22', title: 'Machine Design', questions: 30, duration: 60, difficulty: 'Hard', attempts: 0 },
          { id: '23', title: 'AutoCAD Fundamentals', questions: 25, duration: 45, difficulty: 'Easy', attempts: 1, bestScore: 85 },
          { id: '24', title: 'Finite Element Analysis', questions: 20, duration: 50, difficulty: 'Hard', attempts: 0 }
        ]
      }
    ],
    electronics: [
      {
        id: 'circuits',
        title: 'Electronic Circuits',
        description: 'Analog and digital circuit analysis',
        icon: Zap,
        tests: [
          { id: '25', title: 'Analog Circuit Analysis', questions: 35, duration: 60, difficulty: 'Medium', attempts: 1, bestScore: 70 },
          { id: '26', title: 'Digital Electronics', questions: 40, duration: 65, difficulty: 'Medium', attempts: 0 },
          { id: '27', title: 'Microprocessors & Controllers', questions: 30, duration: 55, difficulty: 'Hard', attempts: 2, bestScore: 78 }
        ]
      },
      {
        id: 'communication',
        title: 'Communication Systems',
        description: 'Signal processing and communication technologies',
        icon: Monitor,
        tests: [
          { id: '28', title: 'Signal Processing', questions: 25, duration: 50, difficulty: 'Hard', attempts: 0 },
          { id: '29', title: 'Wireless Communication', questions: 30, duration: 55, difficulty: 'Medium', attempts: 1, bestScore: 73 },
          { id: '30', title: 'Antenna Theory', questions: 20, duration: 40, difficulty: 'Hard', attempts: 0 }
        ]
      }
    ]
  };

  const departmentOptions = [
    { id: 'general', name: 'General (All Students)', icon: Brain },
    { id: 'cse', name: 'Computer Science Engineering', icon: Code },
    { id: 'it', name: 'Information Technology', icon: Monitor },
    { id: 'mechanical', name: 'Mechanical Engineering', icon: Wrench },
    { id: 'electronics', name: 'Electronics Engineering', icon: Zap }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Department Selection */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Select Your Department</CardTitle>
          <CardDescription>Choose your department to see relevant technical tests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              {departmentOptions.map((dept) => (
                <TabsTrigger key={dept.id} value={dept.id} className="text-xs">
                  <dept.icon className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline">{dept.name}</span>
                  <span className="md:hidden">{dept.name.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Test Categories */}
      <div className="space-y-6">
        {testCategories[selectedDepartment]?.map((category) => (
          <Card key={category.id} className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <category.icon className="h-6 w-6" />
                <span>{category.title}</span>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tests.map((test) => (
                  <Card key={test.id} className="border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{test.title}</CardTitle>
                        <Badge className={getDifficultyColor(test.difficulty)}>
                          {test.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{test.questions} questions</span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDuration(test.duration)}
                        </span>
                      </div>
                      
                      {test.bestScore && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Best Score</span>
                            <span className="font-medium">{test.bestScore}%</span>
                          </div>
                          <Progress value={test.bestScore} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {test.attempts} attempts
                        </span>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          {test.attempts === 0 ? 'Start Test' : 'Retake'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Statistics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Department Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {testCategories[selectedDepartment]?.reduce((acc, cat) => acc + cat.tests.length, 0) || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {testCategories[selectedDepartment]?.reduce((acc, cat) => 
                  acc + cat.tests.filter(test => test.attempts > 0).length, 0) || 0}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {testCategories[selectedDepartment]?.reduce((acc, cat) => 
                  acc + cat.tests.filter(test => test.bestScore && test.bestScore >= 80).length, 0) || 0}
              </div>
              <div className="text-sm text-muted-foreground">High Scores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {testCategories[selectedDepartment]?.reduce((acc, cat) => 
                  acc + cat.tests.reduce((sum, test) => sum + (test.bestScore || 0), 0), 0) / 
                  (testCategories[selectedDepartment]?.reduce((acc, cat) => 
                    acc + cat.tests.filter(test => test.bestScore).length, 0) || 1) || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
