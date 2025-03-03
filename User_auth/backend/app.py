from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sensei_owner:owners@localhost/sensei_db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sensei_db_user:vbBQTd7AaLMzMRgK0QKJpyOtlS3YNq8k@dpg-cv2ckaggph6c73bf0u0g-a.oregon-postgres.render.com/sensei_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mysecretkey'  #Secret key for session management

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  #Unique ID for each user
    name = db.Column(db.String(100), nullable=False)  # User's full name (required)
    email = db.Column(db.String(100), nullable=False, unique=True)  # User's email (must be unique)
    password_hash = db.Column(db.String(150), nullable=False) # Encrypted password (hashed)

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/teacher')
def teacher():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':  # Checks if the form is submitted
        name = request.form['name']  # Get user name from the form
        email = request.form['email']  # Get user email from the form
        password_hash = generate_password_hash(request.form['password'], method='pbkdf2:sha256')   #Hashing the password

        #Checking if the email is already registered
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already exists, Please log in', 'error') 
            # Flash error message
            return render_template('register.html')
        #else
        #Creating a new user record in the database
        new_user = User(name=name, email=email, password_hash=password_hash)  # Using password_hash
        db.session.add(new_user) #Adding new user to the session
        db.session.commit()  #Commits changes to the database

        flash('Registration Successful')

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':  #Checking if login form ia submitted
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()  # Look up user in database with the help of email

        #Checks if user exists and the password is correct
        if user and check_password_hash(user.password_hash, password):  
            flash('Login Successful!')
            return redirect(url_for('landing'))
        else:
            flash('Invalid Email or Password, please try again')

    return render_template('login.html')

@app.route('/student')
def student():
    return render_template('student.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
