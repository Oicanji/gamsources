from ..db import db
from flask_login import UserMixin
from ..base.user import User as UserEntity

class Ia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    color = db.Column(db.String(150), nullable=False)
    
class Social(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    icon = db.Column(db.String(150), nullable=False)
    
class SocialMedia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String(150), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    social_id = db.Column(db.Integer, db.ForeignKey('social.id'), nullable=False)
    
class User(db.Model, UserMixin, UserEntity):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    image_url = db.Column(db.String(150), nullable=False)
    
class Credits(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    expression = db.Column(db.String(300), nullable=False, default='Created by [name].')
    additional1 = db.Column(db.String(150), nullable=True)
    additional2 = db.Column(db.String(150), nullable=True)
    additional3 = db.Column(db.String(150), nullable=True)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    ref = db.Column(db.String(300), nullable=False)
    type = db.Column(db.String(150), nullable=False)
    source = db.Column(db.String(580), nullable=False)
    attr = db.Column(db.String(150), nullable=True)
    extra = db.Column(db.String(150), nullable=True)

    ia_id = db.Column(db.Integer, db.ForeignKey('ia.id'), nullable=False)
    credit_id = db.Column(db.Integer, db.ForeignKey('credits.id'), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)