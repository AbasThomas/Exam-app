package thomas.come.Exam_app.User.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import thomas.come.Exam_app.User.model.User;
import thomas.come.Exam_app.User.model.UserSubscription;
import thomas.come.Exam_app.User.repository.UserSubscriptionRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final UserSubscriptionRepository subscriptionRepository;

    @Transactional
    public UserSubscription getOrCreateSubscription(User user) {
        return subscriptionRepository.findByUserId(user.getId())
                .orElseGet(() -> subscriptionRepository.save(UserSubscription.builder()
                        .user(user)
                        .build()));
    }

    @Transactional
    public boolean checkAndUseGeneration(User user) {
        UserSubscription subscription = getOrCreateSubscription(user);
        
        // Reset usage if a month has passed since lastResetDate
        if (subscription.getLastResetDate().isBefore(LocalDateTime.now().minusMonths(1))) {
            subscription.setGenerationsUsed(0);
            subscription.setLastResetDate(LocalDateTime.now());
        }

        if (subscription.canGenerate()) {
            subscription.setGenerationsUsed(subscription.getGenerationsUsed() + 1);
            subscription.setLastResetDate(LocalDateTime.now()); // Update last activity
            subscriptionRepository.save(subscription);
            return true;
        }
        return false;
    }
}
