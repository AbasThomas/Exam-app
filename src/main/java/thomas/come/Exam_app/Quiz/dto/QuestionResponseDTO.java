package thomas.come.Exam_app.Quiz.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuestionResponseDTO {
    private Long id;
    private String text;
    private List<OptionResponseDTO> options;
}
