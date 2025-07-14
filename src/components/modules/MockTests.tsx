
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, Play, CheckCircle, Target, Award, BarChart3, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MockTests = () => {
  const { toast } = useToast();
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testActive, setTestActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const tests = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Test your basic JavaScript knowledge',
      duration: 30,
      totalQuestions: 25,
      difficulty: 'Beginner',
      attempts: 2,
      bestScore: 85,
      questions: [
        {
          id: 1,
          question: 'What is the correct way to declare a variable in JavaScript?',
          options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'x := 5;'],
          correct: 0
        },
        {
          id: 2,
          question: 'Which method is used to add an element to the end of an array?',
          options: ['push()', 'add()', 'append()', 'insert()'],
          correct: 0
        },
        {
          id: 3,
          question: 'What does "=== " operator do in JavaScript?',
          options: ['Assignment', 'Comparison without type checking', 'Strict equality comparison', 'Addition'],
          correct: 2
        }
      ]
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      description: 'Advanced DSA concepts and problem solving',
      duration: 45,
      totalQuestions: 30,
      difficulty: 'Advanced',
      attempts: 1,
      bestScore: 78,
      questions: [
        {
          id: 1,
          question: 'What is the time complexity of binary search?',
          options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
          correct: 1
        },
        {
          id: 2,
          question: 'Which data structure uses LIFO principle?',
          options: ['Queue', 'Stack', 'Array', 'Linked List'],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: 'System Design Basics',
      description: 'Introduction to system design principles',
      duration: 60,
      totalQuestions: 20,
      difficulty: 'Intermediate',
      attempts: 0,
      bestScore: null,
      questions: [
        {
          id: 1,
          question: 'What is load balancing?',
          options: ['Data storage technique', 'Distribution of workloads across multiple servers', 'Code optimization', 'Database indexing'],
          correct: 1
        }
      ]
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (testActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testActive, timeLeft]);

  const startTest = (test: any) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(test.duration * 60); // Convert minutes to seconds
    setTestActive(true);
    setShowResults(false);
  };

  const finishTest = () => {
    if (!selectedTest) return;
    
    setTestActive(false);
    
    // Calculate results
    let correctAnswers = 0;
    selectedTest.questions.forEach((question: any, index: number) => {
      if (answers[index] === question.correct.toString()) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / selectedTest.questions.length) * 100);
    const results = {
      score,
      correctAnswers,
      totalQuestions: selectedTest.questions.length,
      timeTaken: selectedTest.duration * 60 - timeLeft,
      accuracy: score
    };
    
    setTestResults(results);
    setShowResults(true);
    
    toast({
      title: "Test Completed!",
      description: `You scored ${score}% with ${correctAnswers}/${selectedTest.questions.length} correct answers.`,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'border-green-200 text-green-700';
      case 'Intermediate': return 'border-yellow-200 text-yellow-700';
      case 'Advanced': return 'border-red-200 text-red-700';
      default: return 'border-gray-200 text-gray-700';
    }
  };

  // Test taking interface
  if (testActive && selectedTest) {
    const question = selectedTest.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedTest.questions.length) * 100;
    
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Test Header */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{selectedTest.title}</CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {selectedTest.questions.length}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span className="text-lg font-mono font-bold text-orange-500">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <Button onClick={finishTest} variant="outline">
                  Submit Test
                </Button>
              </div>
            </div>
            <Progress value={progress} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion]}
              onValueChange={(value) => setAnswers({...answers, [currentQuestion]: value})}
            >
              {question.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentQuestion === selectedTest.questions.length - 1 ? (
            <Button onClick={finishTest} className="bg-green-600 hover:bg-green-700">
              Submit Test
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(Math.min(selectedTest.questions.length - 1, currentQuestion + 1))}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Results interface
  if (showResults && testResults) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl">Test Completed!</CardTitle>
            <CardDescription>Here are your results for {selectedTest?.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">{testResults.score}%</div>
              <div className="text-lg text-muted-foreground">
                {testResults.correctAnswers} out of {testResults.totalQuestions} questions correct
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{testResults.correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.floor(testResults.timeTaken / 60)}m {testResults.timeTaken % 60}s
                  </div>
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{testResults.accuracy}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={() => setShowResults(false)}>
                Back to Tests
              </Button>
              <Button onClick={() => startTest(selectedTest)} variant="outline">
                Retake Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main tests list
  return (
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
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tests.length}</p>
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
                <p className="text-2xl font-bold">{tests.filter(t => t.attempts > 0).length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(tests.reduce((sum, t) => sum + (t.bestScore || 0), 0) / tests.filter(t => t.bestScore).length) || 0}%
                </p>
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
                <p className="text-2xl font-bold">{tests.reduce((sum, t) => sum + t.attempts, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Attempts</p>
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
                {test.bestScore && (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Best: {test.bestScore}%
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{test.duration} mins</span>
                </div>
                <span>{test.totalQuestions} questions</span>
                <Badge variant="outline" className={getDifficultyColor(test.difficulty)}>
                  {test.difficulty}
                </Badge>
              </div>
              
              {test.attempts > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attempts: {test.attempts}</span>
                    <span>Best Score: {test.bestScore}%</span>
                  </div>
                  <Progress value={test.bestScore || 0} className="h-2" />
                </div>
              )}
              
              <Button 
                className="w-full" 
                onClick={() => startTest(test)}
                variant={test.attempts > 0 ? "outline" : "default"}
              >
                <Play className="h-4 w-4 mr-2" />
                {test.attempts > 0 ? 'Retake Test' : 'Start Test'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
