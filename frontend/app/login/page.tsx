'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { loginSchema } from '../../../src/utils/validation' 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
  const router = useRouter();

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      // optional: show login error
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
      {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email[0]}</p>}

      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {errors.password && <p className="text-red-600 text-sm mb-2 -mt-2">{errors.password[0]}</p>}

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
