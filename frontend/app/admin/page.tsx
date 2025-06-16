'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [data, setData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5001/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setData(res.data.message))
      .catch(() => setData('Forbidden'));
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Admin</h1>
      <p>{data}</p>
    </div>
  );
}
