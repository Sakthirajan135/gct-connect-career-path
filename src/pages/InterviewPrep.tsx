
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Video, Book, Users, Play, Clock } from 'lucide-react';

const InterviewPrep = () => {
  const { user } = useAuth();

  if (!user) return null;

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
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="mock">Mock Interviews</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="tips">Tips & Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Book className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">Technical Interview Guide</CardTitle>
                  </div>
                  <CardDescription>Comprehensive guide for technical interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Read Guide</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Video className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg">HR Interview Videos</CardTitle>
                  </div>
                  <CardDescription>Watch sample HR interview sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Watch Videos</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-lg">Group Discussion</CardTitle>
                  </div>
                  <CardDescription>Practice group discussions online</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Join Session</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mock" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Schedule Mock Interview</CardTitle>
                  <CardDescription>Book a one-on-one mock interview session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Available Slots</h4>
                    <div className="space-y-2">
                      {['Tomorrow 10:00 AM', 'Tomorrow 2:00 PM', 'Day after 11:00 AM'].map((slot, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{slot}</span>
                          <Button size="sm" variant="outline">Book</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>AI Mock Interview</CardTitle>
                  <CardDescription>Practice with our AI interviewer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Duration: 30-45 minutes</span>
                    </div>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start AI Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Common Interview Questions</CardTitle>
                <CardDescription>Practice with frequently asked questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Technical', count: 150, color: 'blue' },
                    { category: 'HR & Behavioral', count: 80, color: 'green' },
                    { category: 'Company Specific', count: 120, color: 'purple' },
                    { category: 'Situational', count: 60, color: 'orange' }
                  ].map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{cat.category}</h4>
                        <p className="text-sm text-muted-foreground">{cat.count} questions available</p>
                      </div>
                      <Button variant="outline">Practice</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Before the Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Research the company thoroughly</li>
                    <li>• Review your resume and prepare examples</li>
                    <li>• Practice common technical questions</li>
                    <li>• Prepare questions to ask the interviewer</li>
                    <li>• Test your tech setup for virtual interviews</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>During the Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Maintain eye contact and good posture</li>
                    <li>• Listen carefully before answering</li>
                    <li>• Use the STAR method for behavioral questions</li>
                    <li>• Think out loud during technical problems</li>
                    <li>• Ask clarifying questions when needed</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
