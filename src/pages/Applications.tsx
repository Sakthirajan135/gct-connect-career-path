
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { JobTracker } from '@/components/modules/JobTracker';

const Applications = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout userRole={user.role}>
      <JobTracker />
    </DashboardLayout>
  );
};

export default Applications;
