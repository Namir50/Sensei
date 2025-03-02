from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sensei_owner:owners@localhost/sensei_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mysecretkey'

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(150), nullable=False)  # Renamed field for clarity

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/teacher')
def teacher():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password_hash = generate_password_hash(request.form['password'], method='pbkdf2:sha256')

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already exists, Please log in', 'error') 
            # Flash error message
            return render_template('register.html')

        new_user = User(name=name, email=email, password_hash=password_hash)  # Using password_hash
        db.session.add(new_user)
        db.session.commit()

        flash('Registration Successful')

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password_hash, password):  # Corrected password check
            flash('Login Successful!')
            return redirect(url_for('home'))
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
