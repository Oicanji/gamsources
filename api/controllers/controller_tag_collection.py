from models.tag import Tag
from utils.console import console
from extensions import db
from models.collection import Collection
from models.tag_collection import TagCollection

# class TagCollection(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
#     collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)
    
def add_tag_in_collection(collection_id, tag_id):
    console.log("Add tag in collection method called")
    try:
        collection = Collection.query.filter_by(id=collection_id).first()
        if not collection:
            raise Exception('Collection not found')
        
        tag = Tag.query.filter_by(id=tag_id).first()
        if not tag:
            raise Exception('Tag not found')
        
        new_tag_collection = TagCollection(tag_id=tag_id, collection_id=collection_id)
        
        db.session.add(new_tag_collection)
        db.session.commit()
        
        return new_tag_collection
    except Exception as e:
        console.error(e)
        raise e
    
def remove_tag_in_collection(collection_id, tag_id):
    console.log("Remove tag in collection method called")
    try:
        collection = Collection.query.filter_by(id=collection_id).first()
        if not collection:
            raise Exception('Collection not found')
        
        tag = Tag.query.filter_by(id=tag_id).first()
        if not tag:
            raise Exception('Tag not found')
        
        tag_collection = TagCollection.query.filter_by(tag_id=tag_id, collection_id=collection_id).first()
        if not tag_collection:
            raise Exception('Tag not found in collection')
        
        db.session.delete(tag_collection)
        db.session.commit()
        
        return tag_collection
    except Exception as e:
        console.error(e)
        raise e