"use client";

import React, { useState } from 'react';
import { Upload, FileText, Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface AIQuizGeneratorProps {
  userId: number;
  onQuizGenerated: (quiz: any) => void;
}

export default function AIQuizGenerator({ userId, onQuizGenerated }: AIQuizGeneratorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [isInterview, setIsInterview] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'generating' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!file || !title) {
      setError('Please provide a title and select a document.');
      return;
    }

    setStatus('generating');
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());
    formData.append('title', title);
    formData.append('description', description);
    formData.append('numberOfQuestions', numQuestions.toString());
    formData.append('difficulty', difficulty);
    formData.append('isInterview', isInterview.toString());

    try {
      const response = await axios.post('http://localhost:8080/api/ai-quiz/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setStatus('success');
      onQuizGenerated(response.data);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setError(err.response?.data || 'Failed to generate quiz. Check your limits or try again.');
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-500/10 rounded-2xl">
          <Sparkles className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">AI Quiz Generator</h2>
          <p className="text-gray-400 text-sm">Create exams and interviews from documents in seconds.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Java Fundamentals Midterm"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What should students know about this quiz?"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Number of Questions</label>
            <input
              type="number"
              min="1"
              max="20"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
          <input
            type="checkbox"
            id="isInterview"
            checked={isInterview}
            onChange={(e) => setIsInterview(e.target.checked)}
            className="w-5 h-5 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
          />
          <label htmlFor="isInterview" className="text-sm text-gray-300 cursor-pointer">
            This is an Interview Preparation (AI will act as an Interviewer)
          </label>
        </div>

        <div className="relative group">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`border-2 border-dashed ${file ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 group-hover:border-white/20'} rounded-2xl p-8 flex flex-col items-center justify-center transition-all`}>
            {file ? (
              <>
                <FileText className="w-10 h-10 text-indigo-400 mb-3" />
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-gray-400 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB</p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-500 mb-3" />
                <p className="text-gray-300 font-medium">Click to upload document</p>
                <p className="text-gray-500 text-sm mt-1">PDF, DOCX, or TXT up to 10MB</p>
              </>
            )}
          </div>
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p>Quiz generated successfully!</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={status === 'generating' || !file || !title}
          className="w-full py-4 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'generating' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Quiz
            </>
          )}
        </button>
      </div>
    </div>
  );
}
