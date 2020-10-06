from firebase_admin import credentials
from flask import Flask, g, render_template
from flask_cors import CORS, cross_origin
from flask_httpauth import HTTPTokenAuth
from os import environ
from src.ItemsAPI import items_api
from src.TokenAuthentication import auth
from src.UsersAPI import users_api
import firebase_admin

firebase_auth_creds = {
  "type": "service_account",
  "project_id": environ["FIREBASE_PROJECT_ID"],
  "private_key_id": environ["FIREBASE_PRIVATE_KEY_ID"],
  "private_key": environ["FIREBASE_PRIVATE_KEY"].replace('\\n', '\n'),
  "client_email": environ["FIREBASE_CLIENT_EMAIL"],
  "client_id": environ["FIREBASE_CLIENT_ID"],
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": environ["FIREBASE_CLIENT_X509_CERT_URL"]
}
cred = credentials.Certificate(firebase_auth_creds)
firebase_admin.initialize_app(cred)

app = Flask(__name__, template_folder='templates')
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
    port = int(environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
