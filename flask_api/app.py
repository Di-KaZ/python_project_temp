from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table, Column, String, Integer, ForeignKey, DateTime
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
from functools import wraps

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///model.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['SECRET_KEY'] = 'configurestrongsecretkeyhere'

db = SQLAlchemy(app)

"""
*** CLASSES
"""

class User(db.Model):
    __tablename__ = "Users"
    id = Column(Integer, primary_key=True)
    username = Column(String(25), unique=True, nullable=False)
    password = Column(String(50), nullable=False)
    date_creation = Column(DateTime, default=datetime.utcnow)


class Pearl(db.Model):
    __tablename__ = "PearlsAndJewels"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.id'))
    content = Column(String(300), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)


class Comment(db.Model):
    __tablename__ = "Comments"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.id'))
    pearl_id = Column(Integer, ForeignKey('PearlsAndJewels.id'))
    comment = Column(String(200), nullable=False)


class Smiley(db.Model):
    __tablename__ = "Smileys"
    id = Column(Integer, primary_key=True)
    alt_name = Column(String(25), nullable=False)
    img_link = Column(String, nullable=False)


class Associations(db.Model):
    __tablename__ = "Associations"
    user_id = Column(Integer, ForeignKey('Users.id'), primary_key=True)
    smiley_id = Column(Integer, ForeignKey('Smileys.id'), primary_key=True)
    pearl_id = Column(Integer, ForeignKey('PearlsAndJewels.id'), primary_key=True)

def get_user_from_token(token, secret_key):
    try:
        username = jwt.decode(token, secret_key)
        user = db.session.query(User).filter(User.username == username['user']).first()
        return user
    except:
        return None

@app.route("/check_token", methods=["POST"])
def check_login(*args, **kwargs):
    logs = request.get_json()
    if 'token' in logs:
        try:
            jwt.decode(logs['token'], app.config['SECRET_KEY'])
        except:
            return jsonify({"error": "token is invalid"}), 401
    return jsonify({"message": "token is valid"}), 200


"""
 * wrapper used to protect route that need the user to be logged in
"""
def login_required(f):
    @wraps(f)
    def check_login(*args, **kwargs):
        logs = request.get_json()
        if 'token' in logs:
            try:
                jwt.decode(logs['token'], app.config['SECRET_KEY'])
            except:
                return jsonify({"error": "token is invalid"}), 401
        return f(*args, **kwargs)
    return check_login

@app.route("/register", methods=["POST"])
def register():
    logs = request.get_json()
    if logs['password'] != logs['passwordBis']:
        return jsonify({'error': 'Les mots de passe ne correspondent pas.'}), 500
    try:
        db.session.add(User(username=logs['userName'], password=generate_password_hash(logs['password'])))
        db.session.commit()
        return jsonify({'message': 'Votre compte a ete cree'}), 200
    except:
        return jsonify({"error": "une erreur est intervenue"}), 500

@app.route("/login", methods=["POST"])
def login():
    logs = request.get_json()
    user = db.session.query(User).filter(User.username == logs['userName']).first()
    if user and check_password_hash(user.password, logs['password']):
        token = jwt.encode({'user': logs['userName'], 'exp': datetime.utcnow() + timedelta(minutes=30)}, app.config['SECRET_KEY'])
        response = make_response({"message": "user logged in"})
        response.set_cookie('token', token.decode('UTF-8'))
        return response
    return jsonify({'error': 'username or password incorrect'}), 500

@app.route('/profile', methods=["POST"])
def profile():
    data = request.get_json()
    try:
        user = get_user_from_token(data['token'], app.config['SECRET_KEY'])
        return jsonify({'username': user.username,'password': user.password, 'date_creation': user.date_creation}), 200
    except Exception as e:
        return jsonify({'error': 'unexcpected error '}), 401

@app.route('/delete_account', methods=["POST"])
@login_required
def delete_account():
    data = request.get_json()
    user = get_user_from_token(data['token'], app.config['SECRET_KEY'])
    try:
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'account deleted !'}), 200
    except Exception as e:
        return jsonify({'error': 'unexcpected error '}), 401