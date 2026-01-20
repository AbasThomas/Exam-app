package thomas.come.Exam_app.Quiz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import thomas.come.Exam_app.Quiz.model.Quiz;
import thomas.come.Exam_app.Quiz.repository.QuizRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    public Quiz createQuiz(Quiz quiz) {
        // Link questions to quiz if provided (for cascading save)
        if (quiz.getQuestions() != null) {
            quiz.getQuestions().forEach(q -> {
                q.setQuiz(quiz);
                if (q.getOptions() != null) {
                    q.getOptions().forEach(o -> o.setQuestion(q));
                }
            });
        }
        return quizRepository.save(quiz);
    }

    public Quiz updateQuiz(Long id, Quiz quizDetails) {
        Quiz quiz = getQuizById(id);
        quiz.setTitle(quizDetails.getTitle());
        quiz.setDescription(quizDetails.getDescription());
        quiz.setTimeLimitMinutes(quizDetails.getTimeLimitMinutes());
        // For simplicity, we just save the basic details. 
        // Updating questions might need more complex logic (syncing lists).
        return quizRepository.save(quiz);
    }

    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }
}
