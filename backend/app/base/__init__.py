from ..db import db
from flask_login import UserMixin

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
    
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(100), unique=True)
    #to do change to hash a password
    password = db.Column(db.String(100))
    image_url = db.Column(db.String(150), nullable=False)
    
class License(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    expression = db.Column(db.String(300), nullable=False, default='Created by [name].')
    additional1 = db.Column(db.String(150), nullable=True)
    additional2 = db.Column(db.String(150), nullable=True)
    additional3 = db.Column(db.String(150), nullable=True)
    license = db.Column(db.String(150), nullable=False, default='CC BY 4.0')

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    ref = db.Column(db.String(300), nullable=False)
    is_ia = db.Column(db.String(150), nullable=False, default='False')
    
    type = db.Column(db.String(150), nullable=False)
    
    source = db.Column(db.String(580), nullable=False)
    attr = db.Column(db.String(150), nullable=True)
    extra = db.Column(db.String(150), nullable=True)

    license_id = db.Column(db.Integer, db.ForeignKey('license.id'), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)
    
class Collection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    contains = db.Column(db.String(150), nullable=False)
    view = db.Column(db.Integer, nullable=False, default=0)
    up_votes = db.Column(db.Integer, nullable=False, default=0)
    down_votes = db.Column(db.Integer, nullable=False, default=0)
    
class TagCollection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)
    
class UserCollectionVotes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)
    vote = db.Column(db.Integer, nullable=False, default=0)
    
# Triggers to update Votes in Collection table if UserCollectionVotes is inserted or updated
@db.event.listens_for(UserCollectionVotes, 'after_insert')
def update_votes_collection(mapper, connection, target):
    collection = Collection.query.filter_by(id=target.collection_id).first()
    if target.vote == 1:
        collection.up_votes += 1
    elif target.vote == -1:
        collection.down_votes += 1
    db.session.commit()