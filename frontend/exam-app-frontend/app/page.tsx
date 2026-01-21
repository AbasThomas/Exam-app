'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, BarChart2, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-background" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <header className="animate-subtle-float">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
            The Future of
            <br />
            <span className="text-gradient-primary">Assessments</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-slate-300 mx-auto mb-8">
            An open-source platform to create, share, and evaluate exams with unparalleled ease and efficiency.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/quiz" className="btn-primary">
              Start a Demo Exam <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/admin" className="btn-secondary">
              Admin Console
            </Link>
          </div>
        </header>

        <section className="w-full max-w-5xl mt-24">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-primary" />}
              title="Seamless Exam Experience"
              description="A clean, intuitive interface for test-takers that minimizes distractions."
            />
            <FeatureCard
              icon={<Cpu className="w-8 h-8 text-primary" />}
              title="AI-Powered Grading"
              description="Leverage automated grading to get instant, accurate results."
            />
            <FeatureCard
              icon={<BarChart2 className="w-8 h-8 text-primary" />}
              title="In-Depth Analytics"
              description="Track performance, identify knowledge gaps, and view detailed reports."
            />
          </div>
        </section>

        <footer className="absolute bottom-8 text-slate-500 text-sm">
          Powered by Next.js & Spring Boot
        </footer>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 text-left rounded-2xl glass glass-hover">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
