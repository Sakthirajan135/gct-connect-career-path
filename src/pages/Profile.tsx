
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProfileModule } from '@/components/modules/ProfileModule';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout userRole={user.role}>
      <ProfileModule />
    </DashboardLayout>
  );
};

export default Profile;
