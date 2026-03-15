from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from datetime import date

import models
import schemas
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow React connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "HRMS API Running"}


# ---------------- EMPLOYEE API ----------------

@app.post("/employees")
def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):

    new_employee = models.Employee(
        employee_id=emp.employee_id,
        name=emp.name,
        email=emp.email,
        department=emp.department
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


@app.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()


@app.delete("/employees/{id}")
def delete_employee(id: int, db: Session = Depends(get_db)):

    emp = db.query(models.Employee).filter(models.Employee.id == id).first()

    if emp:
        db.delete(emp)
        db.commit()

    return {"message": "Employee deleted"}


# ---------------- ATTENDANCE API ----------------

@app.post("/attendance")
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):

    new_attendance = models.Attendance(
        employee_id=att.employee_id,
        date=att.date,
        status=att.status
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance


@app.get("/attendance/{att_date}")
def get_attendance_by_date(att_date: date, db: Session = Depends(get_db)):

    records = db.query(models.Attendance).filter(
        models.Attendance.date == att_date
    ).all()

    return records