package thomas.come.Exam_app.Result.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import thomas.come.Exam_app.Option.model.Option;
import thomas.come.Exam_app.Option.repository.OptionRepository;
import thomas.come.Exam_app.Question.model.Question;
import thomas.come.Exam_app.Quiz.dto.AnswerSubmissionDTO;
import thomas.come.Exam_app.Quiz.dto.QuizSubmissionDTO;
import thomas.come.Exam_app.Quiz.model.Quiz;
import thomas.come.Exam_app.Quiz.service.QuizService;
import thomas.come.Exam_app.Result.model.QuizResult;
import thomas.come.Exam_app.Result.repository.QuizResultRepository;
import thomas.come.Exam_app.User.model.User;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GradingService {

    private final QuizService quizService;
    private final OptionRepository optionRepository;
    private final QuizResultRepository quizResultRepository;

    public QuizResult gradeQuiz(User user, QuizSubmissionDTO submission) {
        Quiz quiz = quizService.getQuizById(submission.getQuizId());
        
        int score = 0;
        
        Map<Long, Question> questionMap = quiz.getQuestions().stream()
                .collect(Collectors.toMap(Question::getId, Function.identity()));

        for (AnswerSubmissionDTO answer : submission.getAnswers()) {
            Question question = questionMap.get(answer.getQuestionId());
            if (question != null) {
                Option selectedOption = optionRepository.findById(answer.getSelectedOptionId())
                        .orElse(null);
                
                if (selectedOption != null && selectedOption.getQuestion().getId().equals(question.getId()) 
                        && selectedOption.isCorrect()) {
                    score++;
                }
            }
        }

        QuizResult result = new QuizResult();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(score);
        result.setCompletedAt(LocalDateTime.now());

        return quizResultRepository.save(result);
    }
}
