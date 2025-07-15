
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DepartmentTests } from '@/components/modules/DepartmentTests';

const Tests = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mock Tests & Assessments</h1>
          <p className="text-muted-foreground">Practice tests categorized by department and skill level</p>
        </div>
        
        <DepartmentTests />
      </div>
    </DashboardLayout>
  );
};

export default Tests;
