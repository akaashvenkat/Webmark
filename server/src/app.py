from flask import Flask, g
from flask_httpauth import HTTPTokenAuth
from flask_cors import CORS, cross_origin

import firebase_admin
from firebase_admin import credentials

from src.TokenAuthentication import auth
from src.ItemsAPI import items_api
from src.UsersAPI import users_api


cred = credentials.Certificate("full_path_to/instance/webmark_firebase_admin_key.json")
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
def hello():
    return "API is up and running!", 200


@app.route("/status")
def status():
    return "Ok!", 200


@app.route("/authreq")
@auth.login_required
def authreq():
    return "blah"


if __name__ == "__main__":
    app.run()
