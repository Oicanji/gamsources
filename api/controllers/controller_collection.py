from sqlalchemy import asc, desc
from models.view import View
from models.item import Item
from models.tag_collection import TagCollection
from models.collection import Collection
from models.user import User
from utils.dict import object_to_dict
from controllers.controller_item import get_item
from extensions import db
from utils.console import console


def add_collection(user_id):
    console.log("Add collection method called")

    new_collection = Collection(user_id=user_id)

    db.session.add(new_collection)
    db.session.commit()

    return new_collection


def get_collection(id):
    console.log("Get collection method called")

    collection = Collection.query.filter_by(id=id).first()
    if not collection:
        raise Exception("Collection not found.")
    
    items_in_collection = Item.query.filter_by(collection_id=id).all()

    items = []
    for item in items_in_collection:
        items.append(get_item(item.id))

    new_view = View(collection_id=id)

    db.session.add(new_view)
    db.session.commit()

    return {"collection": object_to_dict(collection), "items": items}


def get_user_collections(user_id, offset=0, limit=25):
    console.log("Get user collections method called")

    return Collection.query.filter_by(user_id=user_id).order_by(Collection.id).limit(limit).offset(offset).all()


def get_collections(limit=25, offset=0, order_by='', order='asc'):
    console.log("Get collections method called")

    orderByArgs = Collection.id
    # if order_by == 'view':
    #     orderByArgs = Collection.view

    if order == 'desc':
        return Collection.query.order_by(desc(orderByArgs)).limit(limit).offset(offset).all()
    return Collection.query.order_by(asc(orderByArgs)).limit(limit).offset(offset).all()


def get_collections_by_tags(tags, limit=25, offset=0, order_by='', order='asc'):
    console.log("Get collections by tags method called")
    tag_ids = [int(tag_id) for tag_id in tags.split(',') if tag_id.strip()]
    console.log(tag_ids)

    query = db.session.query(Collection).join(
        TagCollection).filter(TagCollection.tag_id.in_(tag_ids))

    # if order_by == 'view':
    #     if order == 'asc':
    #         query = query.order_by(Collection.view)
    #     else:
    #         query = query.order_by(Collection.view.desc())
    # else:
    query = query.order_by(Collection.id)

    return query.limit(limit).offset(offset).all()


def edit_collection(data):
    console.log("Edit collection method called")

    collection = Collection.query.filter_by(id=data.get('id')).first()

    if data.get('name'):
        collection.name = data.get('name')

    if data.get('contains'):
        collection.contains = data.get('contains')

    db.session.commit()

    return collection


def delete_collection(id):
    console.log("Delete collection method called")

    collection = Collection.query.filter_by(id=id).first()

    db.session.delete(collection)
    db.session.commit()

    return collection


def is_my_collection_or_iam_adm(user_id, collection_id):
    console.log("Is my collection or I am admin method called")

    collection = Collection.query.filter_by(id=collection_id).first()
    if collection.id == user_id:
        return True
    user = User.query.filter_by(id=user_id).first()
    return user.is_admin
