package thomas.come.Exam_app.Result.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thomas.come.Exam_app.Option.model.Option;
import thomas.come.Exam_app.Question.model.Question;
import thomas.come.Exam_app.Quiz.dto.*;
import thomas.come.Exam_app.Quiz.model.Quiz;
import thomas.come.Exam_app.Quiz.service.QuizService;
import thomas.come.Exam_app.Result.model.QuizResult;
import thomas.come.Exam_app.Result.repository.QuizResultRepository;
import thomas.come.Exam_app.Result.service.GradingService;
import thomas.come.Exam_app.User.model.User;
import thomas.come.Exam_app.User.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamController {

    private final QuizService quizService;
    private final GradingService gradingService;
    private final UserRepository userRepository;
    private final QuizResultRepository quizResultRepository;

    @GetMapping("/{id}")
    public ResponseEntity<QuizResponseDTO> getQuizForTaking(@PathVariable Long id) {
        Quiz quiz = quizService.getQuizById(id);
        return ResponseEntity.ok(convertToDTO(quiz));
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResult> submitQuiz(@RequestBody QuizSubmissionDTO submission, 
                                               @RequestParam Long userId) {
        // In a real app, we'd get the user from the SecurityContext
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        QuizResult result = gradingService.gradeQuiz(user, submission);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/results/{userId}")
    public List<QuizResult> getUserResults(@PathVariable Long userId) {
        return quizResultRepository.findByUserId(userId);
    }

    private QuizResponseDTO convertToDTO(Quiz quiz) {
        QuizResponseDTO dto = new QuizResponseDTO();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setTimeLimitMinutes(quiz.getTimeLimitMinutes());
        
        if (quiz.getQuestions() != null) {
            dto.setQuestions(quiz.getQuestions().stream()
                .map(this::convertQuestionToDTO)
                .collect(Collectors.toList()));
        }
        return dto;
    }

    private QuestionResponseDTO convertQuestionToDTO(Question question) {
        QuestionResponseDTO dto = new QuestionResponseDTO();
        dto.setId(question.getId());
        dto.setText(question.getText());
        
        if (question.getOptions() != null) {
            dto.setOptions(question.getOptions().stream()
                .map(this::convertOptionToDTO)
                .collect(Collectors.toList()));
        }
        return dto;
    }

    private OptionResponseDTO convertOptionToDTO(Option option) {
        OptionResponseDTO dto = new OptionResponseDTO();
        dto.setId(option.getId());
        dto.setText(option.getText());
        return dto;
    }
}
