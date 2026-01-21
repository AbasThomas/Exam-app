const API_BASE_URL = 'http://localhost:8080/api';

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    let errorMessage = `API error: ${response.status}`;
    
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json().catch(() => ({}));
      errorMessage = errorData.message || errorMessage;
    } else {
      const textError = await response.text().catch(() => '');
      console.error('Non-JSON Error Response:', textError);
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const quizApi = {
  // Admin
  createQuiz: (quiz) => apiFetch('/admin/quizzes', { method: 'POST', body: JSON.stringify(quiz) }),
  getAllQuizzesAdmin: () => apiFetch('/admin/quizzes'),
  
  // Public/Student
  getAllQuizzes: () => apiFetch('/exams'), // Assuming we might add a list endpoint
  getQuizById: (id) => apiFetch(`/exams/${id}`),
  submitQuiz: (submission, userId) => 
    apiFetch(`/exams/submit?userId=${userId}`, { method: 'POST', body: JSON.stringify(submission) }),
  getUserResults: (userId) => apiFetch(`/results/${userId}`),
};

export const userApi = {
  createUser: (user) => apiFetch('/users', { method: 'POST', body: JSON.stringify(user) }),
  getUsers: () => apiFetch('/users'),
};
