'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { signupSchema } from '@/utils/validation'

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
  const router = useRouter();

  const handleSignup = async () => {
    const result = signupSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem('token', res.data.token);

      const tokenPayload = JSON.parse(atob(res.data.token.split('.')[1]));
      
      // Redirecting based on role
      if (tokenPayload.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
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
      {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email[0]}</p>}

      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border px-3 py-2 w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {errors.password && <p className="text-red-600 text-sm mb-4 -mt-2">{errors.password[0]}</p>}

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
