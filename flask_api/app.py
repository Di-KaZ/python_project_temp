from flask import Flask

app = Flask(__name__)


@app.route("/hey")
def test():
    return {"hey": "Hello From Flask"}