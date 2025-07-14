
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Resources as ResourcesModule } from '@/components/modules/Resources';

const Resources = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout userRole={user.role}>
      <ResourcesModule />
    </DashboardLayout>
  );
};

export default Resources;
