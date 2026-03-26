from flask import Flask, request, jsonify
from models import *

app = Flask(__name__)


# LOGIN
@app.route('/login', methods=['POST'])
def login():
    data = request.json

    user = login_user(data['email'], data['password'])

    if user:
        return jsonify({
            "status": "success",
            "role": user[3]   # role column
        })
    else:
        return jsonify({"status": "fail"})
    

# ADD STUDENT
@app.route('/add_student', methods=['POST'])
def add_student_route():
    data = request.json

    add_student(data['name'], data['email'])

    return jsonify({"status": "student added"})


# ADD TEACHER
@app.route('/add_teacher', methods=['POST'])
def add_teacher_route():
    data = request.json

    add_teacher(data['name'], data['email'])

    return jsonify({"status": "teacher added"})


# MARK ATTENDANCE
@app.route('/attendance', methods=['POST'])
def attendance():
    data = request.json

    mark_attendance(data['student_id'], data['status'])

    return jsonify({"status": "attendance marked"})


# GET STUDENTS
@app.route('/students', methods=['GET'])
def students():
    data = get_students()
    return jsonify(data)


# GET ATTENDANCE
@app.route('/attendance', methods=['GET'])
def attendance_data():
    data = get_attendance()
    return jsonify(data)


app.run(debug=True)

@app.route('/attendance_stats', methods=['GET'])
def stats():
    data = get_attendance_stats()
    return jsonify(data)