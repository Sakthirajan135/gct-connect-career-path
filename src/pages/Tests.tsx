
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MockTests } from '@/components/modules/MockTests';

const Tests = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout userRole={user.role}>
      <MockTests />
    </DashboardLayout>
  );
};

export default Tests;
