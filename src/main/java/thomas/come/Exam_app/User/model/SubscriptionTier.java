package thomas.come.Exam_app.User.model;

public enum SubscriptionTier {
    FREE(3),      // 3 generations per month
    PRO(50),     // 50 generations per month
    ENTERPRISE(Integer.MAX_VALUE); // Unlimited

    private final int monthlyLimit;

    SubscriptionTier(int monthlyLimit) {
        this.monthlyLimit = monthlyLimit;
    }

    public int getMonthlyLimit() {
        return monthlyLimit;
    }
}
