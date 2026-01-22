package thomas.come.Exam_app.Quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AIOptionDTO {
    private String text;
    private boolean isCorrect;
}
