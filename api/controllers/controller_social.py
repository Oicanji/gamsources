from models.social import Social
from utils.console import console
from extensions import db

def add_social(name, icon):
    console.log("Add social method called")
    try:
        social = Social.query.filter_by(name=name).first()
        if social:
            raise Exception('Social already exists')
        
        new_social = Social(name=name, icon=icon)
        
        db.session.add(new_social)
        db.session.commit()
        
        return new_social
    except Exception as e:
        console.error(e)
        raise e
    
def edit_social(id, name, icon):
    console.log("Edit social method called")
        
    social = Social.query.filter_by(id=id).first()
    if not social:
        raise Exception('Social not found')
    
    social.name = name if name else social.name
    social.icon = icon if icon else social.icon
    
    db.session.commit()
    
    return social
    
def delete_social(id):
    console.log("Delete social method called")
    
    social = Social.query.filter_by(id=id).first()
    if not social:
        raise Exception('Social not found')
    
    db.session.delete(social)
    db.session.commit()
    
    return social