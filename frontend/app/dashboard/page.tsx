'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5001/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Unauthorized'));
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}