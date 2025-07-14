
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Video, 
  Book, 
  Users, 
  Play, 
  Clock, 
  CheckCircle, 
  Star,
  Download,
  Mic,
  MicOff,
  Pause,
  RotateCcw,
  ArrowRight,
  Award,
  Target,
  Lightbulb,
  FileText,
  Timer,
  Brain,
  TrendingUp
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const InterviewPrep = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mockInterviewStarted, setMockInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [practiceTestStarted, setPracticeTestStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'technical' | 'hr' | 'company' | 'situational' | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<{ [key: number]: string }>({});
  const [practiceTimeLeft, setPracticeTimeLeft] = useState(1800); // 30 minutes
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  if (!user) return null;

  const mockQuestions = [
    "Tell me about yourself and your background.",
    "Why are you interested in this role?",
    "What are your greatest strengths?",
    "Describe a challenging project you worked on.",
    "Where do you see yourself in 5 years?"
  ];

  const questionCategories = {
    technical: [
      "Explain the difference between React class components and functional components.",
      "What is the time complexity of binary search?",
      "How does garbage collection work in Java?",
      "Explain the concept of closures in JavaScript.",
      "What are the SOLID principles in software engineering?"
    ],
    hr: [
      "Tell me about yourself.",
      "Why do you want to work here?",
      "What are your strengths and weaknesses?",
      "Describe a time when you faced a conflict at work.",
      "How do you handle stress and pressure?"
    ],
    company: [
      "What do you know about our company?",
      "Why should we hire you over other candidates?",
      "How would you contribute to our team?",
      "What interests you about our industry?",
      "What are your salary expectations?"
    ],
    situational: [
      "How would you handle a disagreeing team member?",
      "What would you do if you missed an important deadline?",
      "How would you prioritize multiple urgent tasks?",
      "Describe how you would handle constructive criticism.",
      "What would you do if you discovered an error in your work?"
    ]
  };

  const resources = [
    {
      title: "Technical Interview Guide",
      description: "Comprehensive guide covering data structures, algorithms, and system design",
      type: "guide",
      icon: Book,
      color: "blue",
      action: "Read Guide"
    },
    {
      title: "HR Interview Videos",
      description: "Watch sample HR interview sessions and learn best practices",
      type: "video",
      icon: Video,
      color: "green",
      action: "Watch Videos"
    },
    {
      title: "Group Discussion Sessions",
      description: "Practice group discussions with peers online",
      type: "session",
      icon: Users,
      color: "purple",
      action: "Join Session"
    }
  ];

  const interviewTips = [
    {
      category: "Before Interview",
      tips: [
        "Research the company thoroughly",
        "Review your resume and prepare examples",
        "Practice common technical questions",
        "Prepare questions to ask the interviewer",
        "Test your tech setup for virtual interviews"
      ]
    },
    {
      category: "During Interview",
      tips: [
        "Maintain eye contact and good posture",
        "Listen carefully before answering",
        "Use the STAR method for behavioral questions",
        "Think out loud during technical problems",
        "Ask clarifying questions when needed"
      ]
    },
    {
      category: "After Interview",
      tips: [
        "Send a thank-you email within 24 hours",
        "Reflect on your performance and note areas for improvement",
        "Follow up appropriately if you don't hear back",
        "Continue practicing for future interviews",
        "Stay positive and learn from each experience"
      ]
    }
  ];

  const startMockInterview = () => {
    setMockInterviewStarted(true);
    setCurrentQuestion(0);
    setTimeLeft(120);
    setResponses([]);
    toast({
      title: "Mock Interview Started",
      description: "Good luck with your practice session!",
    });
  };

  const nextQuestion = () => {
    if (currentResponse.trim()) {
      setResponses([...responses, currentResponse]);
      setCurrentResponse('');
    }
    
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(120);
    } else {
      completeMockInterview();
    }
  };

  const completeMockInterview = () => {
    const score = Math.floor(Math.random() * 30) + 70; // Simulate score 70-100
    setMockInterviewStarted(false);
    toast({
      title: `Mock Interview Completed!`,
      description: `Your score: ${score}/100. Keep practicing to improve!`,
    });
  };

  const startPracticeTest = (category: 'technical' | 'hr' | 'company' | 'situational') => {
    setSelectedCategory(category);
    setPracticeTestStarted(true);
    setCurrentQuestionIndex(0);
    setPracticeAnswers({});
    setPracticeTimeLeft(1800);
    toast({
      title: "Practice Test Started",
      description: `Starting ${category} questions practice`,
    });
  };

  const submitPracticeTest = () => {
    const answeredQuestions = Object.keys(practiceAnswers).length;
    const totalQuestions = questionCategories[selectedCategory!].length;
    const score = Math.floor((answeredQuestions / totalQuestions) * 100);
    
    setPracticeTestStarted(false);
    setSelectedCategory(null);
    toast({
      title: "Practice Test Completed!",
      description: `Score: ${score}% (${answeredQuestions}/${totalQuestions} answered)`,
    });
  };

  const handleResourceAction = (resource: any) => {
    if (resource.type === 'guide') {
      toast({
        title: "Guide Downloaded",
        description: "Technical Interview Guide has been downloaded successfully.",
      });
    } else if (resource.type === 'video') {
      setSelectedVideo('sample-hr-video');
      setVideoPlaying(true);
    } else if (resource.type === 'session') {
      toast({
        title: "Joining Session",
        description: "Connecting you to the next available group discussion session.",
      });
    }
  };

  // Mock Interview Interface
  if (mockInterviewStarted) {
    return (
      <DashboardLayout userRole={user.role}>
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">AI Mock Interview</CardTitle>
              <CardDescription>Question {currentQuestion + 1} of {mockQuestions.length}</CardDescription>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
                <Progress value={(timeLeft / 120) * 100} className="w-32" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Question:</h3>
                <p className="text-lg">{mockQuestions[currentQuestion]}</p>
              </div>
              
              <div className="space-y-4">
                <Textarea
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  placeholder="Type your response here..."
                  rows={6}
                  className="text-base"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                      {isRecording ? "Stop Recording" : "Record Answer"}
                    </Button>
                    {isRecording && <span className="text-sm text-red-600 animate-pulse">Recording...</span>}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setMockInterviewStarted(false)}>
                      <Pause className="h-4 w-4 mr-2" />
                      Exit
                    </Button>
                    <Button onClick={nextQuestion} disabled={!currentResponse.trim()}>
                      {currentQuestion === mockQuestions.length - 1 ? "Finish" : "Next Question"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Practice Test Interface
  if (practiceTestStarted && selectedCategory) {
    const questions = questionCategories[selectedCategory];
    return (
      <DashboardLayout userRole={user.role}>
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl capitalize">{selectedCategory} Questions</CardTitle>
                  <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Time Remaining</div>
                  <div className="text-lg font-mono">{Math.floor(practiceTimeLeft / 60)}:{(practiceTimeLeft % 60).toString().padStart(2, '0')}</div>
                </div>
              </div>
              <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mt-4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}:</h3>
                <p className="text-base">{questions[currentQuestionIndex]}</p>
              </div>
              
              <Textarea
                value={practiceAnswers[currentQuestionIndex] || ''}
                onChange={(e) => setPracticeAnswers({
                  ...practiceAnswers,
                  [currentQuestionIndex]: e.target.value
                })}
                placeholder="Type your answer here..."
                rows={5}
              />
              
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={submitPracticeTest}>
                    Submit Test
                  </Button>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <Button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                      Next Question
                    </Button>
                  ) : (
                    <Button onClick={submitPracticeTest}>
                      Complete Test
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interview Preparation</h1>
            <p className="text-muted-foreground">Prepare for your upcoming interviews with our comprehensive resources</p>
          </div>
        </div>

        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <Book className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="mock" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Mock Interviews</span>
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Questions</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>Tips & Guides</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource, idx) => (
                <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${resource.color}-100`}>
                        <resource.icon className={`h-6 w-6 text-${resource.color}-600`} />
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleResourceAction(resource)}
                    >
                      {resource.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Video Player Modal */}
            <Dialog open={videoPlaying} onOpenChange={setVideoPlaying}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>HR Interview Training Videos</DialogTitle>
                  <DialogDescription>Sample interview sessions with expert feedback</DialogDescription>
                </DialogHeader>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Video className="h-16 w-16 mx-auto mb-4" />
                    <p>Video Player</p>
                    <p className="text-sm opacity-75">Sample HR Interview Session</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="mock" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>AI Mock Interview</span>
                  </CardTitle>
                  <CardDescription>Practice with our AI interviewer for personalized feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Duration: 15-20 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">5 comprehensive questions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Instant feedback & scoring</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={startMockInterview}>
                    <Play className="h-4 w-4 mr-2" />
                    Start AI Interview
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Interview History</CardTitle>
                  <CardDescription>Your recent mock interview attempts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { date: "Today", score: 85, questions: 5 },
                    { date: "Yesterday", score: 78, questions: 5 },
                    { date: "3 days ago", score: 72, questions: 5 }
                  ].map((attempt, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{attempt.date}</p>
                        <p className="text-sm text-muted-foreground">{attempt.questions} questions</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{attempt.score}/100</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(questionCategories).map(([category, questions]) => (
                <Card key={category} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="capitalize">{category.replace('_', ' & ')} Questions</CardTitle>
                      <Badge variant="secondary">{questions.length} questions</Badge>
                    </div>
                    <CardDescription>
                      Practice {category} interview questions with timer and feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Timer className="h-4 w-4" />
                        <span>30 minutes duration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>Instant scoring & feedback</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => startPracticeTest(category as any)}
                    >
                      Start Practice Test
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {interviewTips.map((tipCategory, idx) => (
                <Card key={idx} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span>{tipCategory.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tipCategory.tips.map((tip, tipIdx) => (
                        <li key={tipIdx} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Resources */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>Extra materials to boost your interview confidence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { title: "Body Language Guide", icon: Users },
                    { title: "Dress Code Tips", icon: Award },
                    { title: "Salary Negotiation", icon: TrendingUp },
                    { title: "Follow-up Etiquette", icon: MessageCircle }
                  ].map((resource, idx) => (
                    <Button key={idx} variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                      <resource.icon className="h-6 w-6" />
                      <span className="text-sm text-center">{resource.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
