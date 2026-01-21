'use client';

import Link from 'next/link';
import { BookA, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 glass">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <BookA className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold">ExamApp</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-slate-300 hover:text-white transition-colors">
            Testimonials
          </Link>
        </div>
        <Link href="/login" className="btn-secondary">
          <LogIn className="w-5 h-5 mr-2" />
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
