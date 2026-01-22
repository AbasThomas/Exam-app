package thomas.come.Exam_app.Quiz.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import thomas.come.Exam_app.Quiz.dto.AIQuestionDTO;
import thomas.come.Exam_app.Quiz.dto.QuizGenerationRequestDTO;
import thomas.come.Exam_app.Quiz.model.Quiz;
import thomas.come.Exam_app.Quiz.service.QuizService;
import thomas.come.Exam_app.User.model.User;
import thomas.come.Exam_app.User.repository.UserRepository;
import thomas.come.Exam_app.User.services.SubscriptionService;
import thomas.come.Exam_app.config.AIQuizService;
import thomas.come.Exam_app.config.DocumentParsingService;
import thomas.come.Exam_app.config.DocumentStorageService;
import thomas.come.Exam_app.Question.model.Question;
import thomas.come.Exam_app.Option.model.Option;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/ai-quiz")
@RequiredArgsConstructor
public class AIQuizController {

    private final AIQuizService aiQuizService;
    private final DocumentStorageService storageService;
    private final DocumentParsingService parsingService;
    private final SubscriptionService subscriptionService;
    private final QuizService quizService;
    private final UserRepository userRepository; // For demo, assuming security context or param

    @PostMapping("/generate")
    public ResponseEntity<?> generateQuiz(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId,
            @ModelAttribute QuizGenerationRequestDTO request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!subscriptionService.checkAndUseGeneration(user)) {
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                    .body("Subscription limit reached. Please upgrade to Pro.");
        }

        String filePath = null;
        try {
            filePath = storageService.storeDocument(file);
            String text = parsingService.extractText(filePath);

            List<AIQuestionDTO> aiQuestions;
            if (request.isInterview()) {
                aiQuestions = aiQuizService.generateInterviewQuestions(text, request.getNumberOfQuestions());
            } else {
                aiQuestions = aiQuizService.generateQuizFromText(text, request.getNumberOfQuestions(), request.getDifficulty());
            }

            // Convert DTOs to Entities
            Quiz quiz = new Quiz();
            quiz.setTitle(request.getTitle());
            quiz.setDescription(request.getDescription());
            
            List<Question> questions = new ArrayList<>();
            for (AIQuestionDTO qDto : aiQuestions) {
                Question question = new Question();
                question.setText(qDto.getText());
                question.setQuiz(quiz);
                
                List<Option> options = new ArrayList<>();
                for (var oDto : qDto.getOptions()) {
                    Option option = new Option();
                    option.setText(oDto.getText());
                    option.setCorrect(oDto.isCorrect());
                    option.setQuestion(question);
                    options.add(option);
                }
                question.setOptions(options);
                questions.add(question);
            }
            quiz.setQuestions(questions);

            Quiz savedQuiz = quizService.createQuiz(quiz);
            return ResponseEntity.ok(savedQuiz);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process document: " + e.getMessage());
        } finally {
            if (filePath != null) {
                storageService.deleteDocument(filePath);
            }
        }
    }
}
