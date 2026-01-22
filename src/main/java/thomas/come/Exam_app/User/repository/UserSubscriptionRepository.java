package thomas.come.Exam_app.User.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import thomas.come.Exam_app.User.model.UserSubscription;

import java.util.Optional;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, Long> {
    Optional<UserSubscription> findByUserId(Long userId);
}
