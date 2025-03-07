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
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(150), nullable=False)

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
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Missing fields'}), 400

    existing_user = User.query.filter_by(email=email).first()  #Checks if user exists in database
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    password_hash = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(name=name, email=email, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Registration successful'}), 201

#Login Page API(Here database interaction is there so added /api)
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing fields'}), 400

    user = User.query.filter_by(email=email).first()  #Checks the very first user with the given email
    if user and check_password_hash(user.password_hash, password): #Checks if the password is correct
        session['user_id'] = user.id #Stores the user's id in the session
        return jsonify({'message': 'Login successful'}), 200  
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)