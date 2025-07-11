
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
