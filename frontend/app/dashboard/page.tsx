'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setLoading(false))
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full max-w-4xl relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-green-500 hover:text-red-600 text-lg font-medium"
      >
        Logout
      </button>

      <h1 className="text-4xl font-bold text-center mb-6">Dashboard</h1>
      <p className="text-base text-center">Welcome, User!</p>
    </div>
  );
}
