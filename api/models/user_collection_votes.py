from models.collection import Collection
from extensions import db

class UserCollectionVotes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)
    vote = db.Column(db.Integer, nullable=False, default=0)
    
@db.event.listens_for(UserCollectionVotes, 'after_insert')
def update_votes_collection(mapper, connection, target):
    collection = Collection.query.filter_by(id=target.collection_id).first()
    if target.vote == 1:
        collection.up_votes += 1
    elif target.vote == -1:
        collection.down_votes += 1
    db.session.commit()