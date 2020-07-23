from datetime import datetime
from firebase_admin import firestore
from flask import Blueprint, request, g
from requests.exceptions import ConnectionError, InvalidURL

from src.TokenAuthentication import auth
from src.Item import Item

import firebase_admin
import requests
import sys

items_api = Blueprint('items_api', __name__)


@items_api.route('/create', methods=['POST'])
@auth.login_required
def create_item():

    try:
        url = request.form['url']
    except:
        return {'error': 'missing required params'}, 400

    if "http" not in url or "https" not in url:
        url = "http://" + url
    if validate_url(url) == False:
        return {'error': 'invalid url'}, 400
    url = update_url(url)

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%s")
    order = 0
    owner_uid = g.uid

    response, response_code = get_items()
    if len(response) != 0:
        for item_id in response:
            item_info = response[item_id]
            item = Item.from_dict(item_info)
            cur_order = item_info['order']
            new_order = cur_order + 1
            item.update(order=new_order)

            db = firestore.client()
            try:
                db.collection('items').document(item_id).update(item.to_dict())
            except:
                return {'error': 'something went wrong'}, 500

    item = Item(url=url, timestamp=timestamp, order=order, owner_uid=owner_uid)
    db = firestore.client()

    try:
        new_item_ref = db.collection('items').document()
        new_item_ref.set(item.to_dict())
    except:
        return {'error': 'something went wrong'}, 500

    new_item = item.to_dict()
    new_item['item_id'] = new_item_ref.id

    return new_item, 201


@items_api.route('/info/<string:item_id>', methods=['GET'])
@auth.login_required
def get_item(item_id):

    db = firestore.client()
    try:
        item_dict = db.collection('items').document(item_id).get().to_dict()
        item = Item.from_dict(item_dict)
        item_info = item.to_dict()
        item_info['item_id'] = item_id
    except:
        return {'error': 'item not found'}, 404

    return item_info, 200


@items_api.route('/update/<string:item_id>', methods=['PUT'])
@auth.login_required
def update_item(item_id):

    response, response_code = get_item(item_id)
    if response_code != 200:
        return response, response_code

    item = Item.from_dict(response)
    if item.owner_uid != g.uid:
        return {'error': 'user does not own this item'}, 401
    order = request.form.get('order')
    item.update(order=order)

    db = firestore.client()
    try:
        db.collection('items').document(item_id).update(item.to_dict())
    except:
        return {'error': 'something went wrong'}, 500

    return item.to_dict(), 200


@items_api.route('/delete/<string:item_id>', methods=['DELETE'])
@auth.login_required
def delete_item(item_id):

    response, response_code = get_item(item_id)
    if response_code != 200:
        return response, response_code

    item = Item.from_dict(response)
    if item.owner_uid != g.uid:
        return {'error': 'user does not own this item'}, 401

    db = firestore.client()
    try:
        db.collection('items').document(item_id).delete()
    except:
        return {'error': 'something went wrong'}, 500

    return item.to_dict(), 200



@items_api.route('/user', methods=['GET'])
@auth.login_required
def get_items():

    db = firestore.client()
    user_id = g.uid
    items = db.collection('items').where("owner_uid", "==", user_id).stream()
    result = get_firebase_items(items)

    return result, 200


@items_api.route('/user/<string:user_id>', methods=['GET'])
@auth.login_required
def get_other_user_items(user_id):

    db = firestore.client()
    items = db.collection('items').where("owner_uid", "==", user_id).stream()
    result = get_firebase_items(items)

    return result, 200



def validate_url(url):

    try:
        request = requests.get(url)
    except ConnectionError:
        return False
    except InvalidURL:
        return False
    else:
        return True


def update_url(url):

	if "youtube.com" in url:
		id = url.split("?v=")[1]
		id = id.replace("/", "")
		url = "https://www.youtube.com/embed/" + id
	elif "vimeo.com" in url:
		id = url.split("vimeo.com/")[1]
		id = id.replace("/", "")
		url = "https://player.vimeo.com/video/" + id
	elif "instagram.com" in url:
		if url[len(url)-1] != "/":
			url = url + "/"
		url = url + "embed"

	return url


def get_firebase_items(items):

    result = {}
    for item in items:
        item_info = item.to_dict()
        item_info['item_id'] = item.id
        result[item.id] = item_info

    return result
