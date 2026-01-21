'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { quizApi } from '../../lib/api';

export default function TakeQuizPage() {
  const { id } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // { questionId: optionId }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  useEffect(() => {
    quizApi.getQuizById(id)
      .then(setQuiz)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = async () => {
    if (!confirm('Are you ready to submit your results?')) return;
    
    setSubmitting(true);
    try {
      const submission = {
        quizId: Number(id),
        answers: Object.entries(answers).map(([qId, oId]) => ({
          questionId: Number(qId),
          selectedOptionId: Number(oId)
        }))
      };
      
      const res = await quizApi.submitQuiz(submission, 1);
      setResult(res);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!quiz) return <div className="p-20 text-center text-red-500 font-bold">Error: Assessment Not Found.</div>;

  if (result) {
    const percentage = Math.round((result.score / quiz.questions.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full glass-morphism p-12 text-center animate-float">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/50">
            <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-white mb-2">Assessment Complete</h2>
          <p className="text-slate-400 mb-10">Your performance has been evaluated.</p>
          
          <div className="relative inline-flex items-center justify-center mb-10">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                strokeDasharray={552} strokeDashoffset={552 - (552 * percentage) / 100}
                className="text-[var(--primary)] transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute text-center">
              <span className="text-5xl font-black text-white">{percentage}%</span>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Score</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-slate-400 font-medium text-center">
              You correctly answered <span className="text-[var(--primary)] font-bold">{result.score}</span> out of {quiz.questions.length} questions.
            </div>
            <button onClick={() => router.push('/quiz')} className="btn-premium mt-4">
              Return to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = Math.round(((Object.keys(answers).length) / quiz.questions.length) * 100);

  return (
    <div className="min-h-screen pb-20">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 w-full glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/quiz')} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-white leading-none mb-1 text-left">{quiz.title}</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-left">Question {currentQuestionIdx + 1} of {quiz.questions.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end gap-1">
                <div className="flex justify-between w-40 text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--primary)] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <button onClick={handleSubmit} className="btn-premium py-2 px-6 text-sm">Submit</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="grid lg:grid-cols-[1fr_240px] gap-12">
          {/* Question Area */}
          <div className="space-y-8">
            {quiz.questions.map((question, idx) => (
              idx === currentQuestionIdx && (
                <div key={question.id} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-6 text-left">
                    <h2 className="text-3xl font-bold text-white leading-tight">
                      {question.text}
                    </h2>
                  </div>

                  <div className="grid gap-4">
                    {question.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(question.id, option.id)}
                        className={`group flex items-center p-6 rounded-2xl border transition-all duration-200 text-left ${
                          answers[question.id] === option.id
                            ? 'bg-[color:rgb(56_189_248_/_0.10)] border-[var(--primary)] text-white'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 mr-6 flex items-center justify-center transition-colors ${
                          answers[question.id] === option.id ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-white/20'
                        }`}>
                          {answers[question.id] === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-lg font-medium">{option.text}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-8 border-t border-white/5">
                    <button 
                      onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
                      disabled={currentQuestionIdx === 0}
                      className="text-slate-500 hover:text-white disabled:opacity-0 transition-opacity flex items-center font-bold uppercase tracking-widest text-xs"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      Previous
                    </button>
                    {currentQuestionIdx < quiz.questions.length - 1 ? (
                      <button 
                        onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                        className="btn-premium"
                      >
                        Next Question
                      </button>
                    ) : (
                      <button onClick={handleSubmit} className="btn-premium bg-gradient-to-r from-green-500 to-emerald-600">
                        Finish Assessment
                      </button>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Navigation Sidebar */}
          <div className="hidden lg:block space-y-6 text-left">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Navigation</h4>
            <div className="grid grid-cols-4 gap-2">
              {quiz.questions.map((q: any, i: number) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIdx(i)}
                  className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    currentQuestionIdx === i ? 'bg-(--primary) text-white' : 
                    answers[q.id] ? 'bg-white/10 text-white' : 'bg-white/5 text-slate-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <div className="glass-morphism p-6 mt-12">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Efficiency Tip</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">You can skip questions and come back to them later using the nav grid.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
