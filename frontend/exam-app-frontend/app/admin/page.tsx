'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, BookOpen, Users, BarChart, Sparkles, FileText, Trash2 } from "lucide-react";
import { quizApi } from "@/app/lib/api";
import AIQuizGenerator from "@/app/components/AIQuizGenerator";

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await quizApi.getAllQuizzesAdmin();
      setQuizzes(data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizGenerated = (newQuiz: any) => {
    setQuizzes([newQuiz, ...quizzes]);
    setShowAIGenerator(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you absolutely sure? This action cannot be undone.')) return;
    try {
      const response = await fetch(`http://localhost:8080/api/admin/quizzes/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      fetchQuizzes();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your exams, candidates, and AI generations.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAIGenerator(!showAIGenerator)}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20"
            >
              <Sparkles className="w-5 h-5" />
              {showAIGenerator ? "Hide AI Generator" : "AI Quiz Generator"}
            </button>
            <Link
              href="/admin/create"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all border border-white/10"
            >
              <Plus className="w-5 h-5" />
              Manual Create
            </Link>
          </div>
        </div>

        {showAIGenerator && (
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <AIQuizGenerator userId={1} onQuizGenerated={handleQuizGenerated} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={BookOpen} label="Total Quizzes" value={quizzes.length} color="text-blue-400" />
          <StatCard icon={FileText} label="AI Generations" value="3/3" color="text-indigo-400" />
          <StatCard icon={Users} label="Total Students" value="124" color="text-emerald-400" />
          <StatCard icon={BarChart} label="Avg. Score" value="78%" color="text-amber-400" />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Quizzes</h2>
            <Link href="/pricing" className="text-sm text-indigo-400 hover:underline flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Upgrade for more limits
            </Link>
          </div>
          
          <div className="p-6">
            {quizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {quizzes.map((q: any) => (
                  <div key={q.id} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex justify-between items-start group">
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg mb-1">{q.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{q.description || 'No description'}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs bg-white/10 px-2 py-1 rounded-full">{q.questions?.length || 0} Questions</span>
                        <Link href={`/quiz/${q.id}`} className="text-xs text-indigo-400 hover:underline">Preview</Link>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(q.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                No quizzes found. Create one manually or use the AI generator!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-white/20 transition-all">
      <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-4 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
