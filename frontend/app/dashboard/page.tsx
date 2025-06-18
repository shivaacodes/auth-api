'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="w-full max-w-4xl relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-green-500 hover:text-red-600 text-lg font-medium"
      >
        Logout
      </button>
      
      <h1 className="text-4xl font-bold text-center mb-6">Dashboard</h1>
      <p className="text-base text-center">hi, user!</p>
    </div>
  );
}
