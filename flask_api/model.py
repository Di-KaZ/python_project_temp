from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table, Column,String, Integer, ForeignKey, DateTime
from datetime import datetime
import jwt

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///model.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Tables of project

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "Users"
    id = Column(Integer, primary_key=True)
    username = Column(String(25), unique=True, nullable=False)
    password = Column(String(50), nullable=False)
    date_creation = Column(DateTime, default=datetime.utcnow)
    def getUserFromToken(data, secret_key):
        try:
            username = jwt.decode(data['token'], secret_key)
            user = db.session.query(User).filter(User.username == username['user']).first()
            return user
        except:
            return None


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
