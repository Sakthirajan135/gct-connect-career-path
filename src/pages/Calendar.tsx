
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus } from 'lucide-react';

const Calendar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const events = [
    {
      id: 1,
      title: 'TCS Technical Interview',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'interview',
      location: 'Virtual',
      company: 'TCS'
    },
    {
      id: 2,
      title: 'Infosys Pre-placement Talk',
      date: '2024-01-22',
      time: '2:00 PM',
      type: 'event',
      location: 'Main Auditorium',
      company: 'Infosys'
    },
    {
      id: 3,
      title: 'Mock Interview Session',
      date: '2024-01-25',
      time: '3:00 PM',
      type: 'preparation',
      location: 'Room 301',
      company: 'GCT'
    }
  ];

  const getEventColor = (type: string) => {
    const colors = {
      interview: 'bg-red-100 text-red-800 border-red-200',
      event: 'bg-blue-100 text-blue-800 border-blue-200',
      preparation: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[type as keyof typeof colors] || colors.event;
  };

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Placement Calendar</h1>
            <p className="text-muted-foreground">Stay updated with all placement related events and deadlines</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>January 2024</CardTitle>
                <CardDescription>Your placement schedule</CardDescription>
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
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = i - 6; // Start from previous month
                    const isCurrentMonth = date > 0 && date <= 31;
                    const hasEvent = [20, 22, 25].includes(date);
                    
                    return (
                      <div
                        key={i}
                        className={`p-2 h-20 border rounded-lg text-sm ${
                          isCurrentMonth ? 'bg-background' : 'bg-muted/30 text-muted-foreground'
                        } ${hasEvent ? 'border-primary bg-primary/5' : 'border-border'}`}
                      >
                        {isCurrentMonth && date}
                        {hasEvent && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next few events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge className={getEventColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Week</span>
                  <span className="font-medium">3 events</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Interviews</span>
                  <span className="font-medium">2 scheduled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Deadlines</span>
                  <span className="font-medium">1 pending</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
