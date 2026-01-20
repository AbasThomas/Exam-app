-- Initial Schema for Exam-app

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50)
);

CREATE TABLE quizzes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    time_limit_minutes INTEGER
);

CREATE TABLE questions (
    id BIGSERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    quiz_id BIGINT REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE options (
    id BIGSERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE quiz_results (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    quiz_id BIGINT REFERENCES quizzes(id),
    score INTEGER,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
