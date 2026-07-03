CREATE TYPE user_role_enum AS ENUM('admin','employee');
CREATE TYPE department_enum AS ENUM('it','r&d','hr','finance','mechanical');
CREATE TYPE designation_enum AS ENUM('supervisor','manager','assistant-manager','engineer','associate');
CREATE TYPE priority_enum AS ENUM('low','medium','high');
CREATE TYPE status_enum AS ENUM('pending','in-progress','completed');

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'employee',
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    must_change_password BOOLEAN NOT NULL DEFAULT FALSE,
    department department_enum,
    designation designation_enum,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    assigned_employee INT NOT NULL REFERENCES users(user_id) ON DELETE SET NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    priority priority_enum NOT NULL DEFAULT 'low',
    status status_enum NOT NULL DEFAULT 'pending',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP NOT NULL,
    attachment_url VARCHAR(500),
    attachment_type VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK(due_date >= start_date)
);