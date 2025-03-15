# app.py (Flask backend)
from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='postgresql://sensei_db_user:vbBQTd7AaLMzMRgK0QKJpyOtlS3YNq8k@dpg-cv2ckaggph6c73bf0u0g-a.oregon-postgres.render.com/sensei_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mysecretkey'

CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allowing API routes only

db = SQLAlchemy(app)

#Database table creation
class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(150), nullable=False)
    profile_image = db.Column(db.String(255), nullable=True, default=None)
    skills = db.Column(db.Text, nullable=True, default=None)
    subjects = db.Column(db.Text, nullable=True, default=None)
    qualifications = db.Column(db.Text, nullable=True, default=None)
    location = db.Column(db.String(255), nullable=True, default=None)
    video_url = db.Column(db.String(255), nullable=True, default=None)
    age = db.Column(db.Integer, nullable=True, default=None)
    phone_number = db.Column(db.String(20), nullable=True, default=None)
    profile_views = db.Column(db.Integer, default=0)
    phone_clicks = db.Column(db.Integer, default=0)
    student_count = db.Column(db.Integer, default=0)
    
class Student(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(100), nullable = False, unique = True)
    password_hash = db.Column(db.String(150),nullable = False)

# Landing Page API (No database interaction)
@app.route('/landing')
def landing():
    return jsonify({'message': 'Landing Page'}), 200

# Teacher Page API (No database interaction)
@app.route('/teacher')
def teacher():
    return jsonify({'message': 'Teacher Page'}), 200

# Student Page API (No database interaction)
@app.route('/student')
def student():
    return jsonify({'message': 'Student Page'}), 200

#Registeration Page API(Here dtaabase interation is there so added /api)
@app.route('/api/register/teacher', methods=['POST'])
def register_teacher():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Missing fields'}), 400

    existing_teacher = Teacher.query.filter_by(email=email).first()
    if existing_teacher:
        return jsonify({'message': 'Email already exists'}), 400

    password_hash = generate_password_hash(password, method='pbkdf2:sha256')
    new_teacher = Teacher(name=name, email=email, password_hash=password_hash)
    db.session.add(new_teacher)
    db.session.commit()

    return jsonify({'message': 'Registration successful'}), 201


#Login Page API(Here database interaction is there so added /api)
@app.route('/api/login/teacher', methods=['POST'])
def login_teacher():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing fields'}), 400

    teacher = Teacher.query.filter_by(email=email).first()  #Checks the very first user with the given email
    if teacher and check_password_hash(teacher.password_hash, password): #Checks if the password is correct
        session['teacher_id'] = teacher.id #Stores the user's id in the session
        return jsonify({'message': 'Login successful'}), 200  
    else:
        return jsonify({'message': 'Invalid email or password'}), 401
    
#Fetching Teacher profile data
@app.route('/api/teacher/profile', methods = ['GET'])
def get_teacher_profile():
    teacher_id = session.get('teacher_id')
    if not teacher_id:
        return jsonify({'message':'Unauthorized'}), 401
    
    teacher = Teacher.query.get(teacher_id)
    if not teacher:
        return jsonify({'message':'Teacher not found'}), 404 
    
    return jsonify({
        'id' :teacher.id,
        'name': teacher.name,
        'email': teacher.email,
        'profile_image': teacher.profile_image,
        'skills': teacher.skills,
        'subjects': teacher.subjects,
        'qualifications': teacher.qualification,
        'location': teacher.location,
        'video_url': teacher.video_url,
        'age': teacher.age,
        'phone_number': teacher.phone_number,
    }), 200
    
#  Update Teacher Profile (PUT)
@app.route('/api/teacher/profile', methods=['PUT'])
def update_teacher_profile():
    teacher_id = session.get('teacher_id')  # Check if teacher is logged in
    if not teacher_id:
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.get_json()
    
    teacher = Teacher.query.get(teacher_id)
    if not teacher:
        return jsonify({'message': 'Teacher not found'}), 404
    
    teacher.profile_image = data.get('profile_image', teacher.profile_image)
    teacher.skills = data.get('skills', teacher.skills)
    teacher.subjects = data.get('subjects', teacher.subjects)
    teacher.qualifications = data.get('qualifications', teacher.qualifications)
    teacher.location = data.get('location', teacher.location)
    teacher.video_url = data.get('video_url', teacher.video_url)
    teacher.age = data.get('age', teacher.age)
    teacher.phone_number = data.get('phone_number', teacher.phone_number)
    
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200


@app.route('/api/register/student', methods=['POST'])
def register_student():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Missing fields'}), 400

    existing_student = Student.query.filter_by(email=email).first()  #Checks if user exists in database
    if existing_student:
        return jsonify({'message': 'Email already exists'}), 400

    password_hash = generate_password_hash(password, method='pbkdf2:sha256')
    new_student = Student(name=name, email=email, password_hash=password_hash)
    db.session.add(new_student)
    db.session.commit()
    
    return jsonify({'message': 'Registration successful'}), 201
    
@app.route('/api/login/student', methods=['POST'])
def login_student():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing fields'}), 400

    student = Student.query.filter_by(email=email).first()  #Checks the very first user with the given email
    if student and check_password_hash(student.password_hash, password): #Checks if the password is correct
        session['student_id'] = student.id #Stores the user's id in the session
        return jsonify({'message': 'Login successful'}), 200  
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)