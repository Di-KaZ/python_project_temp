from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from model import *
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import jwt
from functools import wraps

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///model.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['SECRET_KEY'] = 'configurestrongsecretkeyhere'

db = SQLAlchemy(app)

"""
wrapper used to protect route that need the user to be logged in
"""

@app.route("/check_token", methods=["POST"])
def check_login(*args, **kwargs):
    logs = request.get_json()
    if 'token' in logs:
        try:
            jwt.decode(logs['token'], app.config['SECRET_KEY'])
        except:
            return jsonify({"error": "token is invalid"}), 401
    return jsonify({"meaage": "token is valid"}), 401

def loggin_required(f):
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

@app.route("/login", methods=["GET", "POST"])
def login():
    logs = request.get_json()
    user = db.session.query(User).filter(User.username == logs['userName']).first()
    if user and check_password_hash(user.password, logs['password']):
        token = jwt.encode({'user': logs['userName'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        response = make_response({"message": "user logged in"})
        response.set_cookie('token', token.decode('UTF-8'))
        return response
    return jsonify({'error': 'username or password incorrect'}), 500

@app.route('/logout/', methods=["POST"])
@loggin_required
def logout():
    return jsonify({'message': 'deconnected'}), 200

@app.route('/profile', methods=["POST"])
@loggin_required
def profile():
    data = request.get_json()
    user = User.getUserFromToken(data['token'], app.config['SECRET_KEY'])
    if user:
        return jsonify({'username': user.username,'password': user.password}), 200
    else:
        return jsonify({'error': 'wtf'}), 401