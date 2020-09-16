from firebase_admin import auth as firebase_auth
from flask import Flask, g
from flask_httpauth import HTTPTokenAuth
import firebase_admin


auth = HTTPTokenAuth(scheme='Token')

@auth.verify_token
def verify_token(token):
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        g.uid = decoded_token['uid']
        return True
    except:
        return False
