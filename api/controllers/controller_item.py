from sqlalchemy import asc, desc
from api.models.credits import Credits
from extensions import db
from models.collection import Collection
from models.item import Item
from utils.console import console

def add_item(name, ref, is_ia, sensitive_content, type, source, attr, extra, credits_id, collection_id):
    console.log("Add item method called")
    new_item = Item(name=name, ref=ref, is_ia=is_ia, sensitive_content=sensitive_content, type=type, source=source, attr=attr, extra=extra, credits_id=credits_id, collection_id=collection_id)
    
    db.session.add(new_item)
    db.session.commit()
    
    return new_item

def get_item(id):
    console.log("Get item method called")
    item = Item.query.filter_by(id=id).first()
    if item is None:
        raise Exception("Item not found")
    
    credits = Credits.query.filter_by(id=item.credits_id).first()
    
    item.credits = credits    
    
    # collection = Collection.query.filter_by(id=item.collection_id).first()
    
    # collection.view += 1
    # db.session.commit()
    
    return item

def get_items(limit=25, offset=0, order_by='', order='asc'):
    console.log("Get items method called")
    orderByArgs = Item.id
    if order_by == 'view':
        orderByArgs = Item.view
        
    if order == 'desc':
        return Item.query.order_by(desc(orderByArgs)).limit(limit).offset(offset).all()
    return Item.query.order_by(asc(orderByArgs)).limit(limit).offset(offset).all()

def get_items_in_collection(id_collecton, limit=25, offset=0, order_by='', order='asc'):
    console.log("Get items in collection method called")
    collection = Collection.query.filter_by(id=id_collecton).first()
    
    if collection is None:
        return []
    
    orderByArgs = Item.id
    if order_by == 'view':
        orderByArgs = Item.view
        
    if order == 'desc':
        return Item.query.filter_by(collection_id=id_collecton).order_by(desc(orderByArgs)).limit(limit).offset(offset).all()
    return Item.query.filter_by(collection_id=id_collecton).order_by(asc(orderByArgs)).limit(limit).offset(offset).all()

def get_items_from_user(user_id, limit=25, offset=0, order_by='', order='asc'):
    console.log("Get items from user method called")
    collections = Collection.query.filter_by(user_id=user_id).all()
    collections_id = []
    
    if collections is None:
        return []
    
    
    for collection in collections:
        collections_id.append(collection.id)
    
    orderByArgs = Item.id
    if order_by == 'view':
        orderByArgs = Item.view
        
    if order == 'desc':
        return Item.query.filter(Item.collection_id.in_(collections_id)).order_by(desc(orderByArgs)).limit(limit).offset(offset).all()
    return Item.query.filter(Item.collection_id.in_(collections_id)).order_by(asc(orderByArgs)).limit(limit).offset(offset).all()
    
def get_items_from_tags(tags_id, limit=25, offset=0, order_by='', order='asc'):
    # isso aqui vai ser um pouco mais complicado
    console.log("Get items from tag method called")
    return []

def update_item(id, name, ref, is_ia, type, source, attr, extra, credits_id, collection_id):
    item = Item.query.filter_by(id=id).first()
    
    item.name = name if name is not None else item.name
    item.ref = ref if ref is not None else item.ref
    item.is_ia = is_ia if is_ia is not None else item.is_ia
    item.type = type if type is not None else item.type
    item.source = source if source is not None else item.source
    item.attr = attr if attr is not None else item.attr
    item.extra = extra if extra is not None else item.extra
    item.credits_id = credits_id if credits_id is not None else item.credits_id
    item.collection_id = collection_id if collection_id is not None else item.collection_id
    
    db.session.commit()
    
    return item
    
def remove_item(id):
    item = Item.query.filter_by(id=id).first()
    
    db.session.delete(item)
    db.session.commit()
    
    return item

def add_licence(id, licence):
    item = Item.query.filter_by(id=id).first()
    
    item.licence = licence
    
    db.session.commit()
    
    return item