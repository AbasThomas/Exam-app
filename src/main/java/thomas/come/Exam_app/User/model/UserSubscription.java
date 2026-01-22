package thomas.come.Exam_app.User.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private SubscriptionTier tier = SubscriptionTier.FREE;

    @Builder.Default
    private int generationsUsed = 0;

    @Builder.Default
    private LocalDateTime lastResetDate = LocalDateTime.now();

    public boolean canGenerate() {
        return generationsUsed < tier.getMonthlyLimit();
    }
}
