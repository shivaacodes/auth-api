'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      // You can show an error message here if needed
    }
  };

  return (
    <div className="max-w-sm mx-auto w-full">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border px-3 py-2 w-full mb-3 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border px-3 py-2 w-full mb-4 rounded"
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 w-full rounded hover:bg-gray-800 transition"
      >
        Login
      </button>

      <a
        href="http://localhost:5001/api/auth/google"
        className="block mt-4 border border-black text-black text-center py-2 rounded hover:bg-gray-100 transition"
      >
        Continue with Google
      </a>

      <p className="mt-6 text-sm text-center">
        New user?{' '}
        <span
          onClick={() => router.push('/signup')}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign up here
        </span>
      </p>
    </div>
  );
}
