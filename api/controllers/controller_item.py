from sqlalchemy import asc, desc
from utils.dict import list_object_to_dict, object_to_dict
from models.user import User
from models.tag_collection import TagCollection
from models.credits import Credits
from extensions import db
from models.collection import Collection
from models.item import Item
from utils.console import console

def add_item(name, ref, is_ia, sensitive_content, type, source, attr, extra, credits_id, collection_id, user_id):
    console.log("Add item method called")
    
    collection = Collection.query.filter_by(id=collection_id).first()
    if collection is None:
        raise Exception("Collection not found")
    
    if collection.user_id != user_id:
        raise Exception("User not allowed to add item to this collection")
    
    tags_ids = ''
    tags = TagCollection.query.filter_by(collection_id=collection_id).all()
    for tag in tags:
        tags_ids += str(tag.tag_id) + ','
    if tags_ids != '':
        tags_ids = tags_ids[:-1]
    
    new_item = Item(name=name, ref=ref, is_ia=is_ia, sensitive_content=sensitive_content, type=type, source=source, attr=attr, extra=extra, credits_id=credits_id, collection_id=collection_id, tags=tags_ids)
    
    db.session.add(new_item)
    db.session.commit()
    
    return new_item

def get_item(id):
    console.log("Get item method called")
    item = Item.query.filter_by(id=id).first()
    if item is None:
        raise Exception("Item not found")
    
    credits = Credits.query.filter_by(id=item.credits_id).first()  
    if credits:
        return {"item": object_to_dict(item), "credits": object_to_dict(credits)}
    return {"item": object_to_dict(item), "credits": None}

def get_items(offset=0, limit=25, order_by='', order='asc'):
    console.log("Get items method called")
    orderByArgs = Item.id
    if order_by == 'view':
        orderByArgs = Item.view
        
    if order == 'desc':
        return Item.query.order_by(desc(orderByArgs)).limit(limit).offset(offset).all()
    return Item.query.order_by(asc(orderByArgs)).limit(limit).offset(offset).all()

def get_items_in_collection(id_collecton, offset=0, limit=25, order_by='', order='asc'):
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

def get_items_from_user(user_id, offset=0, limit=25, order_by='', order='asc'):
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
    
def get_items_from_tags(tags_id, limit=25, offset=0, order_by='id', order='asc'):
    # isso aqui vai ser um pouco mais complicado
    console.log("Get items from tag method called")
    
    orderByArgs = Item.id
    if order_by == 'view':
        orderByArgs = Item.view
        
    if order == 'desc':
        return Item.query.filter(Item.tags.contains(tags_id)).order_by(desc(orderByArgs)).limit(limit).offset(offset).all()
    return Item.query.filter(Item.tags.contains(tags_id)).order_by(asc(orderByArgs)).limit(limit).offset(offset).all()

def update_item(id, name, ref, is_ia, type, source, attr, extra, credits_id):
    item = Item.query.filter_by(id=id).first()
    
    item.name = name if name is not None else item.name
    item.ref = ref if ref is not None else item.ref
    item.is_ia = is_ia if is_ia is not None else item.is_ia
    item.type = type if type is not None else item.type
    item.source = source if source is not None else item.source
    item.attr = attr if attr is not None else item.attr
    item.extra = extra if extra is not None else item.extra
    item.credits_id = credits_id if credits_id is not None else item.credits_id
    
    db.session.commit()
    
    return item
    
def remove_item(id):
    item = Item.query.filter_by(id=id).first()
    
    db.session.delete(item)
    db.session.commit()
    
    return item

def is_my_item_or_iam_adm(user_id, item_id):
    console.log("Is my item or I am admin method called")
        
    item = Item.query.filter_by(id=item_id).first()
    if item.id == user_id:
        return True
    user = User.query.filter_by(id=user_id).first()
    return user.is_admin