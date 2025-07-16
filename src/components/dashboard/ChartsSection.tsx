
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const ChartsSection = () => {
  const applicationData = [
    { name: 'Jan', applications: 2, selections: 0 },
    { name: 'Feb', applications: 5, selections: 1 },
    { name: 'Mar', applications: 8, selections: 2 },
    { name: 'Apr', applications: 12, selections: 3 },
  ];

  const statusData = [
    { name: 'Applied', value: 12, color: 'hsl(197, 71%, 52%)' },
    { name: 'Shortlisted', value: 5, color: 'hsl(45, 93%, 58%)' },
    { name: 'Selected', value: 3, color: 'hsl(142, 71%, 45%)' },
    { name: 'Rejected', value: 4, color: 'hsl(0, 84%, 60%)' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Application Trends */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle>Application Trends</CardTitle>
          <CardDescription>Monthly application and selection progress</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="applications" fill="hsl(197, 71%, 52%)" name="Applications" radius={[4, 4, 0, 0]} />
              <Bar dataKey="selections" fill="hsl(142, 71%, 45%)" name="Selections" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Application Status Distribution */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
          <CardDescription>Current status of your applications</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
