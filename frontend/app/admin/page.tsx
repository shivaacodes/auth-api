'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setData(res.data.message);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-sm mx-auto mt-10 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-green-500 hover:text-red-600 text-lg font-medium"
      >
        Logout
      </button>

      <h1 className="text-2xl font-semibold mb-4 text-center">Admin Dashboard</h1>
      <p className="text-center">{data}</p>
    </div>
  );
}
