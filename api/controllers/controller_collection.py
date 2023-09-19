from sqlalchemy import asc, desc
from extensions import db
from models.collection import Collection
from models.user import User
from utils.console import console



def add_collection(user_id):
    console.log("Add collection method called")
    try:
        new_collection = Collection(user_id=user_id)
        
        db.session.add(new_collection)
        db.session.commit()
        
        return new_collection
    except Exception as e:
        console.error(e)
        raise e
    
def get_collection(id):
    console.log("Get collection method called")
    try:
        collection = Collection.query.filter_by(id=id).first()
        
        collection.view += 1
        db.session.commit()
        
        return collection
    except Exception as e:
        console.error(e)
        raise e

def get_user_collections(user_id, offset=0, limit=25):
    console.log("Get user collections method called")
    try:
        return Collection.query.filter_by(user_id=user_id).order_by(Collection.id).limit(limit).offset(offset).all()
    except Exception as e:
        console.error(e)
        raise e

def get_collections(limit=25, offset=0, order_by='', order='asc'):
    console.log("Get collections method called")
    try:
        orderByArgs = Collection.id
        if order_by == 'view':
            orderByArgs = Collection.view
            
        if order == 'desc':
            return Collection.query.order_by(desc(orderByArgs)).limit(limit).offset(offset).all()
        return Collection.query.order_by(asc(orderByArgs)).limit(limit).offset(offset).all()

    except Exception as e:
        console.error(e)
        raise e
    
def edit_collection(data, user_id):
    console.log("Edit collection method called")
    try:
        collection = Collection.query.filter_by(id=data.get('id')).first()
        
        if collection.user_id != user_id:
            raise Exception('User is not the owner of this collection')
        
        collection.name = data.get('name')
        collection.contains = data.get('contains')
        
        db.session.commit()
        
        return collection
    except Exception as e:
        console.error(e)
        raise e

def delete_collection(id, user_id):
    console.log("Delete collection method called")
    try:
        collection = Collection.query.filter_by(id=id).first()
        
        user_is_admin = User.query.filter_by(id=user_id).first().is_admin
        
        if not user_is_admin:
            if collection.user_id != user_id:
                raise Exception('User is not the owner of this collection')
        elif user_is_admin and collection.user_id != user_id:
            console.info('User admin deleting collection from another user')
        
        db.session.delete(collection)
        db.session.commit()
        
        return collection
    except Exception as e:
        console.error(e)
        raise e

