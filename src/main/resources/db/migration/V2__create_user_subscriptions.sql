CREATE TABLE user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    tier VARCHAR(20) NOT NULL DEFAULT 'FREE',
    generations_used INTEGER NOT NULL DEFAULT 0,
    last_reset_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_subscription FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_subscription_user UNIQUE (user_id)
);
