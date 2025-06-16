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
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {}
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border px-3 py-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border px-3 py-2 w-full mb-4"
      />
      <button onClick={handleLogin} className="bg-black text-white px-4 py-2 w-full">
        Login
      </button>
      <a
          href="http://localhost:5001/api/auth/google"
          className="block mt-4 border border-black text-black text-center py-2"
        >
          Continue with Google
      </a>
    </div>
  );
}