# hrms-system
**HRMS Employee Management System**

**Project Description**

This project is a simple HRMS (Human Resource Management System) developed using React, FastAPI, and MySQL.

The system helps manage employee details and track attendance.

Users can:

- Add new employees

- View employee list

- Delete employees

- Mark attendance

- View date-wise attendance

The frontend is built with React, the backend uses FastAPI (Python), and the data is stored in a MySQL database.

**Database Setup (MySQL)**

Run the following SQL commands in **MySQL Workbench**.

### Create Database

```sql
CREATE DATABASE hrms;

USE hrms;
```

### Create Employee Table

```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(20),
  name VARCHAR(100),
  email VARCHAR(100),
  department VARCHAR(100)
);
```

### Create Attendance Table

```sql
CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(20),
  date DATE,
  status VARCHAR(20)
);
```





