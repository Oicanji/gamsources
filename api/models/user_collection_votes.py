from models.collection import Collection
from extensions import db

class UserCollectionVotes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)
    vote = db.Column(db.Integer, nullable=False, default=0)