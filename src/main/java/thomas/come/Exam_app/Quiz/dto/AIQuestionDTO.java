package thomas.come.Exam_app.Quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIQuestionDTO {
    private String text;
    private List<AIOptionDTO> options;
}
