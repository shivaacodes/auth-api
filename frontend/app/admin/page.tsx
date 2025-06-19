'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
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
    <div className="w-full max-w-lg mx-auto text-center relative">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="text-green-500 hover:text-red-600 text-sm font-medium border border-green-500 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
      <p>{data}</p>
    </div>
  );
}
