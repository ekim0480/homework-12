DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;
 
 USE employee_db;

 CREATE TABLE department (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(id)
 );

 CREATE TABLE role (
 	id INTEGER(10) AUTO_INCREMENT NOT NULL,
    title VARCHAR(50),
    salary DECIMAL(10,2),
    department_id INTEGER(10),
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
 );
 
 CREATE TABLE employee (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    last_name VARCHAR(30),
    first_name VARCHAR(30),
    role_id INTEGER(5),
    managedBy_id VARCHAR(30),
    manager_id INTEGER(5),
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id)
 );