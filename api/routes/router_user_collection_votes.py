from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from utils.dict import object_to_dict
from controllers.controller_user_collection_votes import new_vote

vote_blueprint = Blueprint('vote', __name__)

@vote_blueprint.route('/', methods=['POST'])
@jwt_required()
def new():
    try:
        user_id = get_jwt_identity()
        
        data = request.get_json()
        
        if 'vote' not in data:
            return jsonify({"msg": "Vote is missing."}), 400
        
        vote = data.get('vote')
        vote = int(vote)
        
        if 'collection_id' not in data:
            return jsonify({"msg": "Collection id is missing."}), 400
        
        collection_id = data.get('collection_id')
        
        res = new_vote(vote, collection_id, user_id)
        
        return jsonify({"msg": "Social added successfully.", "social": object_to_dict(res) }), 201
    except Exception as e:
        return jsonify({"msg": "Error adding social.", "error": str(e)}), 500