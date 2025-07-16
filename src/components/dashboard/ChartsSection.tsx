
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
    { name: 'Applied', value: 12, color: 'hsl(221, 83%, 53%)' },
    { name: 'Shortlisted', value: 5, color: 'hsl(45, 93%, 58%)' },
    { name: 'Selected', value: 3, color: 'hsl(142, 71%, 45%)' },
    { name: 'Rejected', value: 4, color: 'hsl(0, 84%, 60%)' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Application Trends */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold">Application Trends</CardTitle>
          <CardDescription className="text-base">Monthly application and selection progress</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={applicationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={14}
                fontWeight={500}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={14}
                fontWeight={500}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              />
              <Bar 
                dataKey="applications" 
                fill="hsl(221, 83%, 53%)" 
                name="Applications" 
                radius={[6, 6, 0, 0]} 
              />
              <Bar 
                dataKey="selections" 
                fill="hsl(142, 71%, 45%)" 
                name="Selections" 
                radius={[6, 6, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Application Status Distribution */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold">Application Status</CardTitle>
          <CardDescription className="text-base">Current status of your applications</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
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
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center flex-wrap gap-6 mt-6">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium text-muted-foreground">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
