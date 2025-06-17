'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5001/api/auth/signup',
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-semibold mb-6 text-center">Signup</h1>
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
      <button
        onClick={handleSignup}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Signup
      </button>
      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <span
          className="text-blue-600 cursor-pointer underline"
          onClick={() => router.push('/login')}
        >
          Sign in
        </span>
      </p>
    </div>
  );
}
