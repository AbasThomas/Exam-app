'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { quizApi } from '../../lib/api';

export default function CreateQuizPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    timeLimitMinutes: 30,
    questions: [
      {
        text: '',
        options: [
          { text: '', isCorrect: true },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ]
      }
    ]
  });

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { text: '', options: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]}]
    });
  };

  const handleQuizChange = (e: any) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (qIdx: number, text: string) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIdx].text = text;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleOptionChange = (qIdx: number, oIdx: number, text: string) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIdx].options[oIdx].text = text;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleCorrectOptionChange = (qIdx: number, oIdx: number) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIdx].options = newQuestions[qIdx].options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === oIdx
    }));
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await quizApi.createQuiz(quiz);
      router.push('/admin');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-end mb-16">
          <div className="space-y-2 text-left">
            <h1 className="text-4xl font-black text-white tracking-tight">Create Assessment</h1>
            <p className="text-slate-400">Define the parameters of your new examination.</p>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-slate-500 hover:text-white transition-colors uppercase tracking-widest pb-1 border-b border-white/5 hover:border-white/20">
            Exit Builder
          </Link>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section: Metadata */}
          <div className="glass p-10 space-y-8 text-left">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">General Information</h2>
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Title</label>
                    <input
                        name="title"
                        value={quiz.title}
                        onChange={handleQuizChange}
                        required
                        className="input-glow text-xl font-bold"
                        placeholder="e.g. Quantum Electrodynamics"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Abstract / Description</label>
                    <textarea
                        name="description"
                        value={quiz.description}
                        onChange={handleQuizChange}
                        className="input-glow min-h-[120px] py-4"
                        placeholder="Describe the scope and objectives of this assessment..."
                    />
                </div>
                <div className="w-1/2 space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Duration (Minutes)</label>
                    <input
                        type="number"
                        name="timeLimitMinutes"
                        value={quiz.timeLimitMinutes}
                        onChange={handleQuizChange}
                        className="input-glow"
                    />
                </div>
            </div>
          </div>

          {/* Section: Questions */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Question Bank</h2>
                <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded uppercase tracking-tighter">{quiz.questions.length} Total</span>
            </div>

            {quiz.questions.map((q, qIdx) => (
              <div key={qIdx} className="glass p-10 space-y-8 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 p-4 font-black text-6xl text-white/5 pointer-events-none select-none">
                    {qIdx + 1}
                </div>
                
                <div className="space-y-4">
                  <label className="inline-block px-3 py-1 rounded bg-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-2">Item #{qIdx + 1}</label>
                  <input
                    value={q.text}
                    onChange={(e) => handleQuestionChange(qIdx, e.target.value)}
                    required
                    className="input-glow font-medium"
                    placeholder="Provide the question prompt..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className={`flex items-center gap-4 p-2 rounded-2xl border transition-all ${opt.isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/5'}`}>
                      <input
                        type="radio"
                        name={`correct-${qIdx}`}
                        checked={opt.isCorrect}
                        onChange={() => handleCorrectOptionChange(qIdx, oIdx)}
                        className="w-5 h-5 ml-4 accent-green-500 cursor-pointer"
                      />
                      <input
                        value={opt.text}
                        onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                        required
                        className="w-full bg-transparent border-none outline-none text-slate-300 placeholder-slate-600 font-medium py-3 pr-4"
                        placeholder={`Alternative ${oIdx + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="w-full py-6 border-2 border-dashed border-white/10 rounded-3xl text-slate-500 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-xs"
            >
              + Append New Question
            </button>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col items-center">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full md:w-auto md:px-20 py-5 text-xl"
            >
              {submitting ? 'Serializing Data...' : 'Deploy Assessment'}
            </button>
            <p className="text-[10px] text-slate-500 mt-6 uppercase tracking-widest font-bold opacity-50">By deploying, this assessment will be made live in the repository.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
