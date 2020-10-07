USE employee_db;
----------------------------------------------------
INSERT INTO department(name)
VALUES
    ("ACCOUNTING"),
    ("MARKETING"),
    ("CONSULTING")
----------------------------------------------------
INSERT INTO role(title, salary, department_id)
VALUES
    ("CLERK - INTERN", 10000, 1),
    ("CLERK - BOOKKEEPER", 30000, 1),
    ("CLERK - ACCOUNTING SECRETARY", 40000, 1),
    ("CLERK - ACCOUNTING ASSISTANT", 40000, 1),
    ("CLERK - ADMINISTRATIVE SPECIALIST", 40000, 1),
    ("CLERK - FINANCE", 40000, 1),
    ("ACCOUNTANT - INTERN", 10000, 1),
    ("ACCOUNTANT - GENERAL", 50000, 1),
    ("ACCOUNTANT - FORENSIC", 50000, 1),
    ("ACCOUNTANT - MANAGERIAL", 60000, 1),
    ("ACCOUNTANT - COST", 60000, 1),
    ("ACCOUNTANT - TAX", 60000, 1),
    ("ACCOUNTANT - OFFICER", 80000, 1),
    ("ACCOUNTANT - CPA", 80000, 1),
    ("AUDITOR - INTERN", 10000, 1),
    ("AUDITOR - FINANCIAL", 60000, 1),
    ("AUDITOR - COMPLIANCE", 60000, 1),
    ("AUDITOR - INTERNAL", 60000, 1),
    ("AUDITOR - REVENUE TAX SPECIALIST", 60000, 1),
    ("AUDITOR - STATE INCOME TAX SPECIALIST", 60000, 1),
    ("AUDITOR - SENIOR", 70000, 1),
    ("AUDITOR - ASSURANCE MANAGER", 80000, 1),
    ("AUDITOR - MANAGER", 80000, 1),
    ("CONTROLLER - COMPTROLLER", 100000, 1),
    ("CONTROLLER - CORPORATE", 100000, 1),
    ("CONTROLLER - DIRECTOR OF ACCOUNTING", 100000, 1),
    ("CONTROLLER - FINANCE MANAGER", 100000, 1),
    ("CONTROLLER - TREASURER", 100000, 1),
    ("CONTROLLER - BUSINESS", 100000, 1),
    ("CONTROLLER - FINANCIAL", 100000, 1),
    ("CFO - ASSISTANT", 140000, 1),
    ("CFO - VP OF FINANCES", 200000, 1),
    ("CFO - VIRTUAL", 200000, 1),
    ("CFO - CONSTRUCTION", 200000, 1),
----------------------------------------------------
    ("INTERN", 10000, 2),
    ("ANALYST", 50000, 2),
    ("COORDINATOR", 50000, 2),
    ("SPECIALIST", 70000, 2),
    ("MANAGER - PROMOTIONS", 80000, 2),
    ("MANAGER - MARKETING", 80000, 2),
    ("CHIEF MARKETING OFFICER", 120000, 2),
    ("DIRECTOR OF MARKETING", 150000, 2),
-----------------------------------------------------
    ("INTERN", 10000, 3),
    ("ANALYST", 50000, 3),
    ("CONSULTANT", 70000, 3),
    ("SENIOR CONSULTANT", 90000, 3),
    ("SENIOR MANAGER", 120000, 3),
    ("DIRECTOR OF CONSULTING", 150000, 3)
------------------------------------------------------
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Ron", "Jedi", 1, 13),
("Dude", "Dudette", 13, 25),
("Hey", "Now", 25, 30),
("King", "Man", 30, null),
("Small", "Beach", 34, 38),
("Smoke", "Juice", 38, 40),
("Oneone", "Twotwo", 40, 41),
("Wowzers", "Bowzers", 41, null),
("Push", "Pull", 42, 45),
("Win", "Lose", 45, 47),
("Hello", "World", 47, null)