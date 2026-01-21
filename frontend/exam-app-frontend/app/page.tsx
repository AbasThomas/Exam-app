'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, BarChart2, Cpu, Users, CheckCircle, Edit } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-background" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20">
        <div className="animate-subtle-float">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
            Future of Assessments
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
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose ExamApp?</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12">
            Discover the powerful features that make our platform the ultimate assessment tool.
          </p>
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
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 bg-black">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Simple Steps to Success</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <StepCard
              icon={<Edit className="w-10 h-10" />}
              title="Create"
              description="Easily build exams with our intuitive quiz creator."
            />
            <StepArrow />
            <StepCard
              icon={<Users className="w-10 h-10" />}
              title="Share"
              description="Distribute your exam to participants with a simple link."
            />
            <StepArrow />
            <StepCard
              icon={<CheckCircle className="w-10 h-10" />}
              title="Evaluate"
              description="Get instant results and detailed performance analytics."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Loved by Educators & Students</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              text="This platform has revolutionized how I create and manage my class quizzes. The AI grading is a huge time-saver!"
              author="- Sarah J., High School Teacher"
            />
            <TestimonialCard
              text="The interface is so clean and easy to use. I can focus on the questions without any distractions."
              author="- Michael B., University Student"
            />
            <TestimonialCard
              text="In-depth analytics helped me pinpoint exactly where my students were struggling. Highly recommended!"
              author="- David L., Corporate Trainer"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="max-w-2xl text-lg md:text-xl text-slate-300 mx-auto mb-8">
            Take the next step in modernizing your assessments.
            Create an account or try a demo today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/admin/create" className="btn-primary">
              Create Your First Exam <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 text-center border-t border-white/10">
        <div className="container mx-auto text-slate-500">
          <p>&copy; {new Date().getFullYear()} ExamApp. All Rights Reserved.</p>
          <p className="mt-2">Powered by Next.js & Spring Boot</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 text-left rounded-2xl glass glass-hover">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

function StepCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center max-w-xs">
      <div className="p-6 bg-primary/10 rounded-full mb-4 text-primary">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

function StepArrow() {
  return <ArrowRight className="w-12 h-12 text-slate-700 hidden md:block" />;
}

function TestimonialCard({ text, author }: { text: string, author: string }) {
  return (
    <div className="p-8 text-left rounded-2xl glass">
      <p className="text-lg text-slate-300 mb-4">"{text}"</p>
      <p className="font-bold text-primary">{author}</p>
    </div>
  );
}