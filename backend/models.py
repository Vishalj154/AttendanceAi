# models.py

from db import get_db_connection


# 🔹 LOGIN FUNCTION
def login_user(email, password):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM users WHERE email=%s AND password=%s"
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    conn.close()
    return user


# 🔹 ADD STUDENT
def add_student(name, email):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "INSERT INTO students (name, email) VALUES (%s, %s)"
    cursor.execute(query, (name, email))
    conn.commit()

    conn.close()


# 🔹 ADD TEACHER
def add_teacher(name, email):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "INSERT INTO teachers (name, email) VALUES (%s, %s)"
    cursor.execute(query, (name, email))
    conn.commit()

    conn.close()


# 🔹 MARK ATTENDANCE
def mark_attendance(student_id, status):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "INSERT INTO attendance (student_id, status) VALUES (%s, %s)"
    cursor.execute(query, (student_id, status))
    conn.commit()

    conn.close()


# 🔹 GET ALL STUDENTS
def get_students():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM students")
    data = cursor.fetchall()

    conn.close()
    return data


# 🔹 GET ATTENDANCE
def get_attendance_stats():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT status, COUNT(*) FROM attendance GROUP BY status")
    data = cursor.fetchall()

    conn.close()
    return data