
class Item(object):


    def __init__(self, url, timestamp, order, owner_uid):
        self.url = url
        self.timestamp = timestamp
        self.order = order
        self.owner_uid = owner_uid


    @staticmethod
    def from_dict(source):
        url = source.get('url')
        timestamp = source.get('timestamp')
        order = source.get('order')
        owner_uid = source.get('owner_uid')
        return Item(url=url, timestamp=timestamp, order=order, owner_uid=owner_uid)


    def to_dict(self):
        return {
            'url': self.url,
            'timestamp': self.timestamp,
            'order': self.order,
            'owner_uid': self.owner_uid
        }


    def update(self, order):
        self.order = order if order else self.order
