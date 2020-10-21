from datetime import datetime
from firebase_admin import firestore
from flask import Blueprint, request, g
from os import environ
from requests.exceptions import ConnectionError, InvalidURL
from selenium import webdriver
from src.Item import Item
from src.TokenAuthentication import auth
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
        return {'error': 'Please enter a URL to add as a WebMark.'}, 400

    if "http" not in url or "https" not in url:
        url = "http://" + url
    if validate_url(url) == False:
        return {'error': 'Please enter a valid URL to add as a WebMark.'}, 400

    url, url_updated = update_url(url)

    if url_updated == True:
        screenshot = "check iframe"
    else:

        if url == "":
            return {'error': 'Please enter a valid URL to add as a WebMark.'}, 400

        screenshot = get_base_64(url)
        if screenshot == False:
            screenshot = "screenshot unavailable"

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%s")
    order = 0
    owner_uid = g.uid

    if len(screenshot) > 1048480:
        return {'error': 'The WebMark you are trying to add contains too many megabytes. Please try a different WebMark.'}, 500

    response, response_code = get_items()
    if len(response) != 0:
        for item in response:
            item_info = response[item]
            item_id = item_info['item_id']
            cur_order = item_info['order']
            new_order = cur_order + 1

            cur_item = Item.from_dict(item_info)
            cur_item.update(order=new_order)

            db = firestore.client()
            try:
                db.collection('items').document(item_id).update(cur_item.to_dict())
            except:
                return {'error': 'There was an error adding this URL as a WebMark. Please try again.'}, 500

    item = Item(url=url, timestamp=timestamp, order=order, owner_uid=owner_uid, screenshot=screenshot)
    db = firestore.client()

    try:
        new_item_ref = db.collection('items').document()
        new_item_ref.set(item.to_dict())
    except:
        return {'error': 'There was an error adding this URL as a WebMark. Please try again.'}, 500

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
        return {'error': 'The WebMark you are searching for cannot be retrieved. Please try again.'}, 404

    return item_info, 200


@items_api.route('/update/<string:item_id>', methods=['PUT'])
@auth.login_required
def update_item(item_id):

    response, response_code = get_item(item_id)
    if response_code != 200:
        return response, response_code

    item = Item.from_dict(response)
    if item.owner_uid != g.uid:
        return {'error': 'You do not have permissions to update this WebMark.'}, 401
    order = request.form.get('order')
    item.update(order=order)

    db = firestore.client()
    try:
        db.collection('items').document(item_id).update(item.to_dict())
    except:
        return {'error': 'There was an error updating this WebMark. Please try again.'}, 500

    return item.to_dict(), 200


@items_api.route('/delete/<string:item_id>', methods=['DELETE'])
@auth.login_required
def delete_item(item_id):

    response, response_code = get_item(item_id)
    if response_code != 200:
        return response, response_code

    del_item = Item.from_dict(response)
    if del_item.owner_uid != g.uid:
        return {'error': 'You do not have permissions to delete this WebMark.'}, 401

    db = firestore.client()
    try:
        db.collection('items').document(item_id).delete()
    except:
        return {'error': 'There was an error deleting this WebMark. Please try again.'}, 500

    response, response_code = get_items()
    if len(response) != 0:
        for item in response:
            item_info = response[item]
            item_id = item_info['item_id']

            cur_order = item_info['order']
            if cur_order < del_item.order:
                continue
            new_order = cur_order - 1

            cur_item = Item.from_dict(item_info)
            cur_item.update(order=new_order)

            db = firestore.client()
            try:
                db.collection('items').document(item_id).update(cur_item.to_dict())
            except:
                return {'error': 'There was an error deleting this WebMark. Please try again.'}, 500

    return del_item.to_dict(), 200



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


def get_base_64(url):

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-sh-usage')
    chrome_options.binary_location = environ["GOOGLE_CHROME_BIN"]

    driver = webdriver.Chrome(executable_path=environ["CHROMEDRIVER_PATH"], chrome_options=chrome_options)
    driver.set_window_size(1024, 768)

    try:
        driver.get(url)
        base_64 = driver.get_screenshot_as_base64()
    except Exception as e:
        base_64 = False

    if base_64 == False or len(base_64) > 1048480:
        try:
            driver.set_window_size(620, 480)
            base_64 = driver.get_screenshot_as_base64()
        except Exception as e:
            base_64 = False

    driver.quit()
    return base_64


def update_url(url):

    url_updated = False

    try:
        if "youtube.com" in url and (("http://youtube.com" != url) and ("https://youtube.com" != url)) :
            id = url.split("?v=")[1]
            id = id.split("&")[0]
            id = id.replace("/", "")
            url = "https://www.youtube.com/embed/" + id
            url_updated = True
        elif "vimeo.com" in url and (("http://vimeo.com" != url) and ("https://vimeo.com" != url)) :
            id = url.split("vimeo.com/")[1]
            id = id.replace("/", "")
            url = "https://player.vimeo.com/video/" + id
            url_updated = True
        elif "instagram.com" in url and (("http://instagram.com" != url) and ("https://instagram.com" != url)) :
            if url[len(url)-1] != "/":
                url = url + "/"
            url = url + "embed"
            url_updated = True

        return url, url_updated

    except:
        return "", False


def get_firebase_items(items):

    result = {}
    for item in items:
        item_info = item.to_dict()
        item_info['item_id'] = item.id
        result[item_info['order']] = item_info
    result = dict(sorted(result.items()))

    return result
