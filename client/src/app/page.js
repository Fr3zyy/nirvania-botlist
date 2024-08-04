'use client';

import { useAuth } from '@/hooks/auth';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading, logout, login } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please  <a onClick={login}>log in.</a></div>;
  }

  return (
    <div>
      <h1>Index</h1>
      <p>Welcome, {user.username}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}