package thomas.come.Exam_app.Quiz.dto;

import lombok.Data;

@Data
public class AnswerSubmissionDTO {
    private Long questionId;
    private Long selectedOptionId;
}
