
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Code, MessageCircle, Download, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const resources = [
    {
      id: 1,
      title: 'JavaScript MCQs - Set 1',
      category: 'MCQ',
      difficulty: 'Beginner',
      questions: 50,
      description: 'Comprehensive set of JavaScript multiple choice questions covering basics',
      content: 'What is the correct way to declare a variable in JavaScript?\nA) var x = 5\nB) variable x = 5\nC) v x = 5\nD) x := 5\n\nAnswer: A',
      downloadUrl: '/resources/js-mcq-set1.pdf'
    },
    {
      id: 2,
      title: 'Data Structures Coding Problems',
      category: 'Coding',
      difficulty: 'Intermediate',
      questions: 25,
      description: 'Array, Stack, Queue, and Tree problems with solutions',
      content: 'Problem: Implement a stack using arrays\n\nSolution:\nclass Stack {\n  constructor() {\n    this.items = [];\n  }\n  \n  push(element) {\n    this.items.push(element);\n  }\n  \n  pop() {\n    if (this.items.length === 0) return "Underflow";\n    return this.items.pop();\n  }\n}',
      downloadUrl: '/resources/ds-coding-problems.pdf'
    },
    {
      id: 3,
      title: 'TCS Interview Experience 2024',
      category: 'Interview',
      difficulty: 'All Levels',
      questions: 0,
      description: 'Real interview experiences and frequently asked questions',
      content: 'Round 1: Online Test\n- 30 MCQs on programming concepts\n- 2 coding questions\n\nRound 2: Technical Interview\n- Questions on projects\n- DSA problem solving\n- System design basics\n\nRound 3: HR Interview\n- Tell me about yourself\n- Why TCS?\n- Career goals',
      downloadUrl: '/resources/tcs-interview-2024.pdf'
    },
    {
      id: 4,
      title: 'SQL Query Practice Set',
      category: 'MCQ',
      difficulty: 'Intermediate',
      questions: 40,
      description: 'Database queries, joins, and optimization questions',
      content: 'Question: Write a query to find second highest salary\n\nSELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);',
      downloadUrl: '/resources/sql-practice.pdf'
    },
    {
      id: 5,
      title: 'Algorithm Optimization Challenges',
      category: 'Coding',
      difficulty: 'Advanced',
      questions: 15,
      description: 'Time and space complexity optimization problems',
      content: 'Problem: Optimize bubble sort algorithm\n\nOptimized Bubble Sort:\nfor (int i = 0; i < n-1; i++) {\n  bool swapped = false;\n  for (int j = 0; j < n-i-1; j++) {\n    if (arr[j] > arr[j+1]) {\n      swap(arr[j], arr[j+1]);\n      swapped = true;\n    }\n  }\n  if (!swapped) break;\n}',
      downloadUrl: '/resources/algorithm-optimization.pdf'
    },
    {
      id: 6,
      title: 'Infosys HR Round Questions',
      category: 'Interview',
      difficulty: 'All Levels',
      questions: 0,
      description: 'Common HR questions asked in Infosys interviews',
      content: 'Common Questions:\n1. Tell me about yourself\n2. Why do you want to join Infosys?\n3. What are your strengths and weaknesses?\n4. Where do you see yourself in 5 years?\n5. Describe a challenging situation you faced\n\nTips:\n- Be honest and specific\n- Prepare STAR format answers\n- Research about company values',
      downloadUrl: '/resources/infosys-hr-questions.pdf'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || resource.category.toLowerCase() === filterCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'MCQ': return BookOpen;
      case 'Coding': return Code;
      case 'Interview': return MessageCircle;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'MCQ': return 'bg-blue-100 text-blue-800';
      case 'Coding': return 'bg-green-100 text-green-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'border-green-200 text-green-700';
      case 'Intermediate': return 'border-yellow-200 text-yellow-700';
      case 'Advanced': return 'border-red-200 text-red-700';
      default: return 'border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
          <p className="text-muted-foreground">Access MCQs, coding problems, and interview experiences</p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="mcq">MCQs</SelectItem>
              <SelectItem value="coding">Coding Problems</SelectItem>
              <SelectItem value="interview">Interview Experiences</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{resources.length}</div>
            <div className="text-sm text-muted-foreground">Total Resources</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {resources.filter(r => r.category === 'MCQ').length}
            </div>
            <div className="text-sm text-muted-foreground">MCQ Sets</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {resources.filter(r => r.category === 'Coding').length}
            </div>
            <div className="text-sm text-muted-foreground">Coding Problems</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {resources.filter(r => r.category === 'Interview').length}
            </div>
            <div className="text-sm text-muted-foreground">Interview Guides</div>
          </CardContent>
        </Card>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const CategoryIcon = getCategoryIcon(resource.category);
          
          return (
            <Card key={resource.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription className="mt-1">{resource.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getCategoryColor(resource.category)}>
                    {resource.category}
                  </Badge>
                  <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty}
                  </Badge>
                </div>
                
                {resource.questions > 0 && (
                  <div className="text-sm text-muted-foreground">
                    <strong>{resource.questions}</strong> questions included
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{resource.title}</DialogTitle>
                        <DialogDescription>{resource.description}</DialogDescription>
                      </DialogHeader>
                      <div className="max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                          {resource.content}
                        </pre>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find more resources.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
