package thomas.come.Exam_app.Quiz.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuizSubmissionDTO {
    private Long quizId;
    private List<AnswerSubmissionDTO> answers;
}
