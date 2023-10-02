from models.item import Item
from models.tag import Tag
from utils.console import console
from extensions import db
from models.collection import Collection
from models.tag_collection import TagCollection
    
MAX_TAGS_IN_COLLECTION = 30
    
def add_tag_in_collection(collection_id, tag_id):
    console.log("Add tag in collection method called")

    collection = Collection.query.filter_by(id=collection_id).first()
    if not collection:
        raise Exception('Collection not found')
    
    tag = Tag.query.filter_by(id=tag_id).first()
    if not tag:
        raise Exception('Tag not found')
    
    is_exist = TagCollection.query.filter_by(tag_id=tag_id, collection_id=collection_id).first()
    if is_exist:
        raise Exception('Tag already exist in collection')
    
    tags =  TagCollection.query.filter_by(collection_id=collection_id).all()
    if len(tags) >= MAX_TAGS_IN_COLLECTION:
        raise Exception('Max tags in collection reached')
    
    new_tag_collection = TagCollection(tag_id=tag_id, collection_id=collection_id)
    
    # update in all items in collection
    items = Item.query.filter_by(collection_id=collection_id).all()
    for item in items:
        if item.tags:
            item.tags += ',' + str(tag.id)
        else:
            item.tags = tag.id
        
    db.session.add(new_tag_collection)
    db.session.commit()
    
    return new_tag_collection
    
def remove_tag_in_collection(collection_id, tag_id):
    console.log("Remove tag in collection method called")
    
    collection = Collection.query.filter_by(id=collection_id).first()
    if not collection:
        raise Exception('Collection not found')
    
    tag = Tag.query.filter_by(id=tag_id).first()
    if not tag:
        raise Exception('Tag not found')
    
    tag_collection = TagCollection.query.filter_by(tag_id=tag_id, collection_id=collection_id).first()
    if not tag_collection:
        raise Exception('Tag not found in collection')
    
    items = Item.query.filter_by(collection_id=collection_id).all()
    for item in items:
        tags = item.tags.split(',')
        tags.remove(tag.id)
        item.tags = ','.join(tags)
    
    db.session.delete(tag_collection)
    db.session.commit()
    
    return tag_collection