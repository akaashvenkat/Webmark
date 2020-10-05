from firebase_admin import credentials
from flask import Flask, g, render_template
from flask_cors import CORS, cross_origin
from flask_httpauth import HTTPTokenAuth
from os import environ
from src.ItemsAPI import items_api
from src.TokenAuthentication import auth
from src.UsersAPI import users_api
import firebase_admin


cred = credentials.Certificate(environ["python_config_json"])
firebase_admin.initialize_app(cred)

app = Flask(__name__)
app.register_blueprint(items_api, url_prefix='/items')
app.register_blueprint(users_api, url_prefix='/users')


@app.after_request
def do_something_whenever_a_request_has_been_handled(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE")
    return response


@app.route("/")
@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/walkthrough")
def walkthrough():
    return render_template("walkthrough.html")

@app.route("/webmarks")
def webmarks():
    return render_template("webmark.html")


if __name__ == "__main__":
    app.run()
