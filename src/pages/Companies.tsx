
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { CompanyBrowser } from '@/components/modules/CompanyBrowser';

const Companies = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout userRole={user.role}>
      <CompanyBrowser />
    </DashboardLayout>
  );
};

export default Companies;
