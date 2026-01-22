package thomas.come.Exam_app.Quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizGenerationRequestDTO {
    private String title;
    private String description;
    private int numberOfQuestions = 5;
    private String difficulty = "medium";
    private boolean isInterview = false;
}
