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

### How to Run the Project

Follow these steps to start the backend and frontend.

#### 1. Start the Backend

Open a terminal and go to the backend folder:

```bash
cd hrms-lite/backend
```

Run the backend server:

```bash
uvicorn app:main --reload
```

#### 2. Start the Frontend

Open a **new terminal** and go to the frontend folder:

```bash
cd hrms-lite/frontend
```

Run the frontend server:

```bash
npm run dev
```

#### 3. Open the Application

After both servers are running, open your browser and visit:

```
http://localhost:5173
```

**Assumptions / Limitations**

- The system assumes that employee IDs are unique for each employee.
- The application is designed for basic HR operations and does not include advanced HR features like payroll or leave management.
- The system runs in a local development environment (localhost) and is not configured for production deployment.
- The project supports basic CRUD operations and may require additional validation and security for real-world use.
