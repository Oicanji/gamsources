from sqlalchemy import asc, desc
from extensions import db
from models.collection import Collection
from models.user import User
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
    
    collection.view += 1
    db.session.commit()
    
    return collection

def get_user_collections(user_id, offset=0, limit=25):
    console.log("Get user collections method called")
        
    return Collection.query.filter_by(user_id=user_id).order_by(Collection.id).limit(limit).offset(offset).all()


def get_collections(limit=25, offset=0, order_by='', order='asc'):
    console.log("Get collections method called")
    
    orderByArgs = Collection.id
    if order_by == 'view':
        orderByArgs = Collection.view
        
    if order == 'desc':
        return Collection.query.order_by(desc(orderByArgs)).limit(limit).offset(offset).all()
    return Collection.query.order_by(asc(orderByArgs)).limit(limit).offset(offset).all()
    
def edit_collection(data):
    console.log("Edit collection method called")
        
    collection = Collection.query.filter_by(id=data.get('id')).first()
    
    collection.name = data.get('name')
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