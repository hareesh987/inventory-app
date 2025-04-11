CREATE DATABASE IF NOT EXISTS warehouse;

USE warehouse;

CREATE TABLE cylinders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  status ENUM('Full', 'Empty') NOT NULL DEFAULT 'Full'
);

INSERT INTO cylinders (name, status) VALUES
('Cylinder A', 'Full'),
('Cylinder B', 'Empty');