from firebase_admin import auth as firebase_auth
from firebase_admin import _auth_utils as firebase_auth_utils
from flask import Blueprint, jsonify, request, g

from src.TokenAuthentication import auth
import firebase_admin
import sys

users_api = Blueprint('users_api', __name__)


@users_api.route('/create', methods=['POST'])
def create_user():

    try:
        data = request.form.to_dict()
        email = data['email']
        password = data['password']

        user = firebase_auth.create_user(email=email, password=password)
        user_data = jsonify(user_id=user.uid)

        return user_data, 201

    except firebase_auth_utils.EmailAlreadyExistsError:
        return {'error': 'email already exists'}, 400
    except firebase_auth_utils.UnexpectedResponseError:
        return {'error': 'unexpected response'}, 400
    except Exception as inst:
        return {'error': 'request error'}, 400


@users_api.route('/info', methods=['GET'])
@auth.login_required
def get_user():

    user_id = g.uid
    user = firebase_auth.get_user(user_id)
    user_data = jsonify(user_id=user_id, email=user.email)

    return user_data


@users_api.route('/info/<string:user_id>', methods=['GET'])
@auth.login_required
def get_user_with_id(user_id):

    try:
        user = firebase_auth.get_user(user_id)
        user_data = jsonify(user_id=user_id, email=user.email)

        return user_data, 200

    except firebase_auth_utils.UserNotFoundError:
        return {'error': 'user id not found'}, 400


@users_api.route('/update', methods=['POST'])
@auth.login_required
def update_user():

    try:
        data = request.form.to_dict()
        email = data['email']

        user_id = g.uid
        user = firebase_auth.update_user(user_id, email=email)

        return "User Updated", 201

    except firebase_auth_utils.UserNotFoundError:
        return {'error': 'user id not found'}, 400
    except firebase_auth_utils.EmailAlreadyExistsError:
        return {'error': 'email already exists'}, 400
    except firebase_auth_utils.UnexpectedResponseError:
        return {'error': 'unexpected response'}, 400
    except:
        return {'error': 'request error'}, 400


@users_api.route('/delete', methods=['DELETE'])
@auth.login_required
def delete_user():

    try:
        user_id = g.uid
        firebase_auth.delete_user(user_id)

        return "User Deleted", 200

    except firebase_auth_utils.UserNotFoundError:
        return {'error': 'user id not found'}, 400
