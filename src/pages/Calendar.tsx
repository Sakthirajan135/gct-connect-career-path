
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface CalendarEvent {
  id: number;
  title: string;
  type: 'interview' | 'event' | 'preparation' | 'test';
  date: string;
  time: string;
  location: string;
  description?: string;
  company?: string;
}

interface EventFormData {
  title: string;
  type: 'interview' | 'event' | 'preparation' | 'test';
  date: string;
  time: string;
  location: string;
  description: string;
}

const Calendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'TCS Technical Interview',
      date: '2024-01-20',
      time: '10:00',
      type: 'interview',
      location: 'Virtual',
      company: 'TCS',
      description: 'Technical round focusing on data structures and algorithms'
    },
    {
      id: 2,
      title: 'Infosys Pre-placement Talk',
      date: '2024-01-22',
      time: '14:00',
      type: 'event',
      location: 'Main Auditorium',
      company: 'Infosys',
      description: 'Company presentation and Q&A session'
    },
    {
      id: 3,
      title: 'Mock Interview Session',
      date: '2024-01-25',
      time: '15:00',
      type: 'preparation',
      location: 'Room 301',
      description: 'Practice interview with feedback'
    },
    {
      id: 4,
      title: 'Aptitude Test',
      date: '2024-01-18',
      time: '09:00',
      type: 'test',
      location: 'Computer Lab',
      description: 'Online aptitude assessment'
    }
  ]);

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    type: 'event',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  if (!user) return null;

  const getEventColor = (type: string) => {
    const colors = {
      interview: 'bg-red-100 text-red-800 border-red-200',
      event: 'bg-blue-100 text-blue-800 border-blue-200',
      preparation: 'bg-green-100 text-green-800 border-green-200',
      test: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[type as keyof typeof colors] || colors.event;
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'interview': return '💼';
      case 'event': return '🎯';
      case 'preparation': return '📚';
      case 'test': return '📝';
      default: return '📅';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const handleAddEvent = () => {
    if (!formData.title || !formData.date || !formData.time) {
      toast({
        title: "Missing required fields",
        description: "Please fill in title, date, and time.",
        variant: "destructive",
      });
      return;
    }

    const newEvent: CalendarEvent = {
      id: Date.now(),
      ...formData
    };

    setEvents([...events, newEvent]);
    setShowAddEvent(false);
    setFormData({
      title: '',
      type: 'event',
      date: '',
      time: '',
      location: '',
      description: ''
    });

    toast({
      title: "Event added successfully",
      description: `${newEvent.title} has been scheduled.`,
    });
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description || ''
    });
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;

    const updatedEvents = events.map(event =>
      event.id === editingEvent.id
        ? { ...event, ...formData }
        : event
    );

    setEvents(updatedEvents);
    setEditingEvent(null);
    setFormData({
      title: '',
      type: 'event',
      date: '',
      time: '',
      location: '',
      description: ''
    });

    toast({
      title: "Event updated successfully",
      description: "Event details have been saved.",
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Event deleted",
      description: "Event has been removed from your calendar.",
    });
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const today = new Date();
  const isToday = (day: number) => {
    return currentDate.getFullYear() === today.getFullYear() &&
           currentDate.getMonth() === today.getMonth() &&
           day === today.getDate();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Placement Calendar</h1>
            <p className="text-muted-foreground">Stay updated with all placement related events and deadlines</p>
          </div>
          <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Create a new placement-related event
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Event Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="TCS Technical Interview"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Event Type *</label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="event">Pre-placement Talk</SelectItem>
                      <SelectItem value="preparation">Preparation Session</SelectItem>
                      <SelectItem value="test">Mock Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date *</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time *</label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Virtual / Room 301 / Main Auditorium"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Additional details about the event"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddEvent(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEvent}>
                    Add Event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => {
                    const dayEvents = day ? getEventsForDate(day) : [];
                    return (
                      <div
                        key={index}
                        className={`min-h-[100px] p-2 border rounded-lg text-sm cursor-pointer transition-colors ${
                          day 
                            ? `bg-background hover:bg-muted/50 ${isToday(day) ? 'border-primary bg-primary/5' : 'border-border'}` 
                            : 'bg-muted/30'
                        }`}
                        onClick={() => day && handleDateClick(day)}
                      >
                        {day && (
                          <>
                            <div className={`font-medium mb-1 ${isToday(day) ? 'text-primary' : ''}`}>
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs p-1 rounded ${getEventColor(event.type)} truncate`}
                                  title={event.title}
                                >
                                  {getEventTypeIcon(event.type)} {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next few events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg space-y-2 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="flex space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Event</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Event Title *</label>
                                <Input
                                  value={formData.title}
                                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Event Type *</label>
                                <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="interview">Interview</SelectItem>
                                    <SelectItem value="event">Pre-placement Talk</SelectItem>
                                    <SelectItem value="preparation">Preparation Session</SelectItem>
                                    <SelectItem value="test">Mock Test</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Date *</label>
                                  <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Time *</label>
                                  <Input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Location</label>
                                <Input
                                  value={formData.location}
                                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                  value={formData.description}
                                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setEditingEvent(null)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleUpdateEvent}>
                                  Update Event
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Event</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{event.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteEvent(event.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <Badge className={getEventColor(event.type)}>
                      {event.type}
                    </Badge>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(event.time)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-xs text-muted-foreground mt-2">{event.description}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Week</span>
                  <span className="font-medium">{events.filter(e => {
                    const eventDate = new Date(e.date);
                    const today = new Date();
                    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                    return eventDate >= today && eventDate <= weekFromNow;
                  }).length} events</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Interviews</span>
                  <span className="font-medium">{events.filter(e => e.type === 'interview').length} scheduled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tests</span>
                  <span className="font-medium">{events.filter(e => e.type === 'test').length} pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Prep Sessions</span>
                  <span className="font-medium">{events.filter(e => e.type === 'preparation').length} upcoming</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Events for {formatDate(selectedDate)}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {getEventsForDate(parseInt(selectedDate.split('-')[2])).map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge className={getEventColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(event.time)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                    )}
                  </div>
                ))}
                {getEventsForDate(parseInt(selectedDate.split('-')[2])).length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No events scheduled for this date.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
