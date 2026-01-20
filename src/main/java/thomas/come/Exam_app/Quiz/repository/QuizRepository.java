package thomas.come.Exam_app.Quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thomas.come.Exam_app.Quiz.model.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
