INSERT INTO department (name) VALUES
('Engineering'),
('Marketing'),
('Sales'),
('Human Resources'),
('Finance');

INSERT INTO role (title, salary, department)  VALUES
('Software Engineer', 85000, 1),
('Product Manager', 100000, 1),
('Marketing Director', 75000, 2),
('Sales Representative', 65000, 3),
('HR Director', 95000, 4),
('Financial Analyst', 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Smith', 1, NULL),
('Jane', 'Smithe', 2, 1),
('Michael', 'Howard', 3, 2),
('Emily', 'Johnson', 4, NULL),
('David', 'Jones', 5, 4),
('Sarah', 'Brown', 6, NULL),
('Daniel', 'Hernandez', 4, 5);