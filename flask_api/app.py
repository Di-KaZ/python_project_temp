from flask import Flask, request, make_response, jsonify
from model import *
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///model.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
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
    except Exception as e:
        return jsonify({"error", e}), 500

@app.route("/login", methods=["POST"])
def login():
    print('hey')
    logs = request.get_json()
    user = db.session.query(User).filter(User.username == logs['userName']).first()
    if user and check_password_hash(user.password, logs['password']):
        return jsonify({'message': f'Connect as {user.username}'}), 200
    return jsonify({'message': 'username or password incorrect'}), 500