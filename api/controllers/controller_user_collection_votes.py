from models.user_collection_votes import UserCollectionVotes
from models.collection import Collection
from utils.console import console
from extensions import db


def new_vote(vote, collection_id, user_id):
    console.log("New vote method called")
    
    collection = Collection.query.filter_by(id=collection_id).first()
    if collection is None:
        raise Exception("Collection not found")
    
    has_voted = UserCollectionVotes.query.filter_by(collection_id=collection_id, user_id=user_id).first()
    if has_voted is None:
        new_vote = UserCollectionVotes(collection_id=collection_id, user_id=user_id, vote=vote)
        db.session.add(new_vote)
        db.session.commit()
        return new_vote
    else:
        has_voted.vote = vote
          
    if vote > 0:
        collection.votes += 1
    elif vote < 0:
        collection.votes -= 2
    elif vote == 0:
        collection.votes -= 1
          
    db.session.commit()
    
    return has_voted