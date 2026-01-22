package thomas.come.Exam_app.config;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import thomas.come.Exam_app.Quiz.dto.AIQuestionDTO;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIQuizService {

    private final ChatClient chatClient;

    public List<AIQuestionDTO> generateQuizFromText(String text, int numberOfQuestions, String difficulty) {
        String userPrompt = """
                Generate a quiz based on the following text. 
                The quiz should have {numberOfQuestions} questions.
                The difficulty should be {difficulty}.
                
                Text:
                {text}
                
                Return the result as a JSON list of questions, where each question has:
                - 'text': the question text
                - 'options': a list of objects with 'text' and 'isCorrect' (boolean) fields.
                Ensure exactly one option per question is correct.
                """;

        PromptTemplate template = new PromptTemplate(userPrompt);
        Prompt prompt = template.create(Map.of(
                "numberOfQuestions", numberOfQuestions,
                "difficulty", difficulty,
                "text", text
        ));

        return chatClient.prompt(prompt)
                .call()
                .entity(new ParameterizedTypeReference<List<AIQuestionDTO>>() {});
    }

    public List<AIQuestionDTO> generateInterviewQuestions(String text, int numberOfQuestions) {
        String userPrompt = """
                You are an expert interviewer. Based on the provided document (resume or job description), 
                generate {numberOfQuestions} challenging interview questions.
                
                Document:
                {text}
                
                Return the result as a JSON list of questions, where each question has:
                - 'text': the interview question
                - 'options': provide 4 possible answers or talking points, and mark the most 'ideal' or 'structured' answer as 'isCorrect: true'.
                """;

        PromptTemplate template = new PromptTemplate(userPrompt);
        Prompt prompt = template.create(Map.of(
                "numberOfQuestions", numberOfQuestions,
                "text", text
        ));

        return chatClient.prompt(prompt)
                .call()
                .entity(new ParameterizedTypeReference<List<AIQuestionDTO>>() {});
    }
}
