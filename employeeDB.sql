DROP DATABASE IF EXISTS employeedb;

CREATE DATABASE employeedb;

USE employeedb;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES 
('Engineers'),
('RnD'),
('Board'),
('Finance'),
('Marketing'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Dev Ops Engineer', 100000, 1),
('Operations Analyist', 120000, 2),
('CEO', 200000, 3),
('Accountant', 100000, 4),
('Marketer', 90000, 5),
('Sales Rep', 40000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Mohammad', 'Hussain', 1, 653),
('Joe', 'Biden', 2, 666),
('Xi', 'JinPing', 3, 234),
('Valdimir', 'Putin', 4, 734),
('Imran', 'Khan', 5, 231),
('Recep', 'Erdogan', 6, 987);