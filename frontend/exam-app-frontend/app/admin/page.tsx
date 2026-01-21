'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { quizApi } from '../lib/api';

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await quizApi.getAllQuizzesAdmin();
      setQuizzes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you absolutely sure? This action cannot be undone.')) return;
    try {
      // Direct call since we need DELETE which isn't in quizApi yet or use a fetch wrapper
      const response = await fetch(`http://localhost:8080/api/admin/quizzes/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      loadQuizzes();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-(--primary) border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="relative min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">Management <span className="text-gradient-primary">Console</span></h1>
            <p className="text-slate-400">Architecting knowledge and auditing performance.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-white transition-colors uppercase tracking-widest pb-1 self-center mr-4">
              Logout
            </Link>
            <Link href="/admin/create" className="btn-premium">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Create Assessment
            </Link>
          </div>
        </header>

        <div className="grid gap-4">
          {quizzes.length === 0 ? (
            <div className="glass-morphism p-20 text-center border-dashed border-2 border-white/5">
              <p className="text-slate-500 italic text-lg mb-6">Your assessment repository is empty.</p>
              <Link href="/admin/create" className="text-(--primary) font-bold uppercase tracking-widest text-xs hover:underline">
                Initialize First Quiz →
              </Link>
            </div>
          ) : (
            quizzes.map((quiz: any) => (
              <div key={quiz.id} className="glass-morphism p-6 flex flex-col md:flex-row justify-between items-start md:items-center group">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-(--primary) group-hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors uppercase tracking-wide">{quiz.title}</h3>
                        <p className="text-slate-500 text-xs mt-1 font-medium">{quiz.questions?.length || 0} Questions • {quiz.timeLimitMinutes} Minutes</p>
                    </div>
                </div>
                <div className="flex gap-4 mt-6 md:mt-0 w-full md:w-auto">
                    <Link href={`/quiz/${quiz.id}`} className="flex-1 md:flex-initial text-center px-4 py-2 rounded-xl text-slate-400 hover:text-white transition-colors border border-white/5 hover:border-white/20 font-bold text-xs uppercase tracking-widest">
                        Preview
                    </Link>
                    <button 
                        onClick={() => handleDelete(quiz.id)} 
                        className="flex-1 md:flex-initial text-center px-6 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
                    >
                        Archive
                    </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
