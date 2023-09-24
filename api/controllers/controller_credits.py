from models.credits import Credits
from models.item import Item
from utils.console import console
from extensions import db

def add_new_credits(expression, add1, add2, add3, license):
    console.log("Add new credits method called")
    
    new_credits = Credits(expression=expression, additional1=add1, additional2=add2, additional3=add3, license=license)
    
    db.session.add(new_credits)
    db.session.commit()
    
    return new_credits

def get_credits(id):
    console.log("Get credits method called")
    
    credits = Credits.query.filter_by(id=id).first()
    if credits is None:
        raise Exception("Credits not found")
    
    db.session.commit()
    
    return credits

def update_credits(credits_id, expression, add1, add2, add3, license):
    console.log("Update credits method called")
    
    credits = Credits.query.filter_by(id=credits_id).first()
    if credits is None:
        raise Exception("Credits not found")
    
    credits.expression = expression if expression is not None else credits.expression
    credits.additional1 = add1 if add1 is not None else credits.additional1
    credits.additional2 = add2 if add2 is not None else credits.additional2
    credits.additional3 = add3 if add3 is not None else credits.additional3
    credits.license = license if license is not None else credits.license
    
    db.session.commit()
    
    return credits

def remove_credits(credits_id):
    console.log("Remove credits method called")
    
    credits = Credits.query.filter_by(id=credits_id).first()
    if credits is None:
        raise Exception("Credits not found")
    
    db.session.delete(credits)
    db.session.commit()
    
    return credits