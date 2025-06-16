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
    <div className="relative max-w-sm w-full">
      <button
        onClick={handleLogout}
        className="absolute top-0 right-0 text-red-600 text-lg"
      >
        Logout
      </button>

      <h1 className="text-xl mb-4">Dashboard</h1>
      <p>hi, user!</p>
    </div>
  );
}
