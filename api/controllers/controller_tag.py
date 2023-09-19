from models.tag import Tag
from utils.console import console
from extensions import db

def add_tag(name, color):
    console.log("Add tag method called")
    try:
        new_tag = Tag(name=name, color=color)
        
        db.session.add(new_tag)
        db.session.commit()
        
        return new_tag
    except Exception as e:
        console.error(e)
        raise e
    
def get_tag(id):
    console.log("Get tag method called")
    try:
        tag = Tag.query.filter_by(id=id).first()
        
        db.session.commit()
        
        return tag
    except Exception as e:
        console.error(e)
        raise e
    
def get_tags(offset, limit):
    console.log("Get tags method called")
    try:
        tags = Tag.query.order_by(Tag.id).limit(0).offset(12).all()
        print(Tag.query.order_by(Tag.id).all())
        return tags
    except Exception as e:
        console.error(e)
        raise e