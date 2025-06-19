'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [data, setData] = useState('');
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
      .then(res => setData(res.data.message))
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, []);

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl mb-4 font-semibold">Admin</h1>
      <p>{data}</p>
    </div>
  );
}
