'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { quizApi } from '../lib/api';

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quizApi.getAllQuizzesAdmin()
      .then(setQuizzes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-medium animate-pulse">Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">Available Quizzes</h1>
            <p className="text-slate-400">Select an assessment to begin your journey.</p>
          </div>
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-white transition-colors uppercase tracking-widest pb-1 border-b border-white/5 hover:border-white/20">
            Back Home
          </Link>
        </header>

        <div className="grid gap-6">
          {quizzes.length === 0 ? (
            <div className="glass p-16 text-center">
              <p className="text-slate-500 italic text-lg">No active quizzes found. Please check back later.</p>
            </div>
          ) : (
            quizzes.map((quiz) => (
              <div key={quiz.id} className="glass p-8 flex flex-col md:flex-row justify-between items-start md:items-center group">
                <div className="space-y-3 mb-6 md:mb-0">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider">Active</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-white/80 transition-colors">{quiz.title}</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed max-w-xl">{quiz.description}</p>
                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center text-xs text-slate-500 font-medium">
                      <svg className="w-4 h-4 mr-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {quiz.timeLimitMinutes} Minutes
                    </div>
                  </div>
                </div>
                <Link href={`/quiz/${quiz.id}`} className="btn-primary whitespace-nowrap">
                  Start Quiz
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
