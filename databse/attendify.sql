CREATE DATABASE attendify;
USE attendify;

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    subject VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    password VARCHAR(100)
);