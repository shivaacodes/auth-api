'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-sm mx-auto text-center space-y-4">
      <h1 className="text-2xl">auth api test</h1>
      <div className="space-x-2">
        <Link href="/signup" className="underline text-blue-600">Signup</Link>
        <Link href="/login" className="underline text-green-600">Login</Link>
      </div>
    </div>
  );
}
