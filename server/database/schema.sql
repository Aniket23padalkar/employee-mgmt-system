CREATE TYPE user_role_enum AS ENUM('admin','employee');

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    role user_role_enum NOT NULL DEFAULT employee,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);