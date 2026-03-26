CREATE DATABASE attendance_db;
USE attendance_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(20)
);

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    status VARCHAR(10),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users ADD role VARCHAR(20);
INSERT INTO users (email, password, role) VALUES
('admin@gmail.com', '1234', 'admin'),
('teacher@gmail.com', '1234', 'teacher'),
('student@gmail.com', '1234', 'student');