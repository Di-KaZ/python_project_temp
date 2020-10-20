from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from model import *
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///model.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'configurestrongsecretkeyhere'
db = SQLAlchemy(app)

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

# TODO SERCURE COOKIE
@app.route("/login", methods=["GET", "POST"])
def login():
    logs = request.get_json()
    user = db.session.query(User).filter(User.username == logs['userName']).first()
    if user and check_password_hash(user.password, logs['password']):
        test = make_response(jsonify({"message": "user logged in"}) )
        test.set_cookie('session', logs['userName'])
        return test, 200
    return jsonify({'error': 'username or password incorrect'}), 500

@app.route('/logout/<username>', methods=["POST"])
def logout(username):
    return jsonify({'message': 'deconnected'}), 200