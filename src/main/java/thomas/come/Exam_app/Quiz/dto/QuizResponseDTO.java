package thomas.come.Exam_app.Quiz.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuizResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Integer timeLimitMinutes;
    private List<QuestionResponseDTO> questions;
}
