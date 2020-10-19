from flask import Flask
from model import *

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///model.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


@app.route("/hey")
def test():
    return {"hey": "😊 Hello From Flask 😊"}
    # methods post & get

