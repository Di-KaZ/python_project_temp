import jwt
from functools import wraps
from flask_sqlalchemy import SQLAlchemy
from datetime import date, datetime, timedelta
from flask import Flask, request, make_response, jsonify
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///model.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['SECRET_KEY'] = 'configurestrongsecretkeyhere'
db = SQLAlchemy(app)

"""
*** CLASSES Database model
"""

class User(db.Model):
    __tablename__ = "Users"
    id = Column(Integer, primary_key=True)
    username = Column(String(25), unique=True, nullable=False)
    password = Column(String(50), nullable=False)
    date_creation = Column(DateTime, default=datetime.utcnow())


class Pearl(db.Model):
    __tablename__ = "PearlsAndJewels"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.id'))
    content = Column(String(300), nullable=False)
    date = Column(DateTime, default=datetime.utcnow())
    def toJson(self):
        username = db.session.query(User).filter_by(id=self.user_id).first().username
        return {
            "id" : self.id,
            "user_id" : self.user_id,
            "content" : self.content,
            "date" : self.date.strftime('%d %B %Y a %Hh%M'),
            "username" : username
        }

# NOT YET USED
class Smiley(db.Model):
    __tablename__ = "Smileys"
    id = Column(String, primary_key=True)
    smiley = Column(String(1), nullable=False)
    pearl_id = Column(Integer, ForeignKey('PearlsAndJewels.id'))

# NOT YET USED
class AssoSmiley(db.Model):
    __tablename__ = "Association_Smiley"
    user_id = Column(Integer, ForeignKey('Users.id'), primary_key=True)
    smiley_id = Column(Integer, ForeignKey('Smileys.id'), primary_key=True)

class Comment(db.Model):
    __tablename__ = "Comments"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.id'))
    pearl_id = Column(Integer, ForeignKey('PearlsAndJewels.id'), nullable=True)
    comment_id = Column(Integer, ForeignKey('Comments.id'), nullable=True)
    comment = Column(String(200), nullable=False)
    date = Column(String(200), nullable=False)
    def toJson(self):
        username = db.session.query(User).filter_by(id=self.user_id).first().username
        return {
            "id" : self.id,
            "username" : username,
            "pearl_id" : self.pearl_id,
            "comment_id" : self.comment_id,
            "comment" : self.comment,
        }

class Grant(db.Model):
    __tablename__ = "Grants"
    id = Column(Integer, primary_key=True)
    type = Column(String, nullable=False)
    name_grant = Column(String, nullable=False)
    comment_grant = Column(String)


class AssoGrant(db.Model):
    __tablename__ = "Association_Grant"
    grantee_id = Column(String, ForeignKey(Grant.id), primary_key=True)
    granted_id = Column(String, ForeignKey(Grant.id), primary_key=True)


class AssoUser(db.Model):
    __tablename__ = "Association_User"
    user_id = Column(String, ForeignKey(User.id), primary_key=True)
    granted_id = Column(String, ForeignKey(Grant.id), primary_key=True)

# Create new db if not existing
db.create_all()

# Utils
def get_user_from_token(token, secret_key):
    try:
        username = jwt.decode(token, secret_key)
        user = db.session.query(User).filter(User.username == username['user']).first()
        return user
    except:
        return None

"""
*** Function that take a list of page object and return json of it
"""
def jsonify_query(pages):
    jsons = []
    for page in pages:
        for item in page.items:
            jsons.append(item.toJson())
    return jsons

"""
    Json API Route
"""
@app.route("/check_token", methods=["POST"])
def check_login(*args, **kwargs):
    logs = request.get_json()
    if 'token' in logs:
        try:
            jwt.decode(logs['token'], app.config['SECRET_KEY'])
        except:
            return jsonify({"error": "token is invalid"}), 401   # is NOT valide
    return jsonify({"message": "token is valid"}), 200

"""
Wrapper used to protect route that need the user to be logged in
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
    except Exception as e:
        return jsonify({"error": "une erreur est intervenue"}), 500

@app.route("/login", methods=["POST"])
def login():
    logs = request.get_json()

    user = db.session.query(User).filter(User.username == logs['userName']).first()
    if user and check_password_hash(user.password, logs['password']):
        token = jwt.encode({'user': logs['userName'], 'exp': datetime.utcnow() +
                                timedelta(minutes=30)}, app.config['SECRET_KEY'])
        response = make_response({"message": "user logged in"})
        response.set_cookie('token', token.decode('UTF-8'))
        return response
    return jsonify({'error': 'username or password incorrect'}), 500

@app.route('/profile', methods=["POST"])
@login_required
def profile():
    data = request.get_json()
    try:
        user = get_user_from_token(data['token'], app.config['SECRET_KEY'])
        return jsonify({'username': user.username,
                        'password': user.password,
                        'date_creation': user.date_creation.strftime('%d %B %Y')}), 200
    except Exception as e:
        print(e)
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
        return jsonify({'error': 'unexpected error '}), 401

@app.route("/create_pearl", methods=["POST"])
@login_required
def create_pearl():
    logs = request.get_json()
    try:
        id = get_user_from_token(logs['token'], app.config['SECRET_KEY']).id
        db.session.add(Pearl(user_id=id, content=logs['content']))
        db.session.commit()
        return jsonify({'message': 'Votre perle a été créée'}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Une erreur est intervenue dans la création de votre perle"}), 500

@app.route("/get_pearl", methods=["POST"])
def get_pearls():
    logs = request.get_json()
    try:
        pearls = []
        for i in range(1, logs['page'] + 1):
            pearls.append(db.session.query(Pearl).order_by(Pearl.date.asc()
                                                ).paginate(page=i, per_page=100, error_out=False))
        return jsonify(jsonify_query(pearls)), 200
    except Exception as e:
        return jsonify([]), 500


@app.route("/create_comment", methods=["POST"])
@login_required
def create_comment():
    data = request.get_json()
    try:
        id = get_user_from_token(data['token'], app.config['SECRET_KEY']).id
        if 'pearlId' in data.keys(): # if the parent is a pearl
            db.session.add(Comment(user_id=id, pearl_id=data["pearlId"],
                                    comment_id=None, comment=data["comment"], date=datetime.utcnow()))
        else: # it's a comment
            db.session.add(Comment(user_id=id, pearl_id=None,
                                    comment_id=data["commentId"],
                                    comment=data["comment"], date=datetime.utcnow()))
        db.session.commit()
        return jsonify({'message': 'Votre commentaire a été crée.'}), 200
    except Exception as e:
        return jsonify({"error": "Une erreur est intervenue dans la création de votre commentaire"}), 500


@app.route("/get_comment", methods=["POST"])
def get_comment():
    logs = request.get_json()
    try:
        comments = []
        for i in range(1, logs['page'] + 1):
            if 'pearlId' in logs.keys():
                comments.append(db.session.query(Comment).filter_by(pearl_id=logs['pearlId']
                                                        ).order_by(Comment.date.desc()
                                                        ).paginate(page=i, per_page=100))
            else:
                comments.append(db.session.query(Comment).filter_by(comment_id=logs['commentId']
                                                        ).order_by(Comment.date.desc()
                                                        ).paginate(page=i, per_page=100))
            return jsonify(jsonify_query(comments)), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Une erreur est internevue"}), 500


@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    try:
        pearls = []
        pearls.append(db.session.query(Pearl).filter(Pearl.content.contains(data['search'])
                                            ).order_by(Pearl.date.desc()
                                            ).paginate(page=1, per_page=100, error_out=False))
        return jsonify(jsonify_query(pearls)), 200
    except Exception as e:
        return jsonify([]), 500