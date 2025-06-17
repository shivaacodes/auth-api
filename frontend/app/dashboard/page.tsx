'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DashboardPage() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:5001/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Unauthorized'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="w-full max-w-4xl relative">
      {/* Logout button in the top-right */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-green-500 hover:text-red-600 text-lg font-medium"
      >
        Logout
      </button>

      {/* Centered Dashboard title */}
      <h1 className="text-4xl font-bold text-center mb-6">Dashboard</h1>
      <p className="text-base text-center">hi, user!</p>
    </div>
  );
}
