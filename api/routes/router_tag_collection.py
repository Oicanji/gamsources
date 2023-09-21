from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers.controller_collection import is_my_collection_or_iam_adm
from controllers.controller_tag_collection import add_tag_in_collection, remove_tag_in_collection

from utils.dict import object_to_dict

tag_collection_blueprint = Blueprint('tag_collection', __name__)

@tag_collection_blueprint.route('/join', methods=['POST'])
@jwt_required()
def join():
    try:
        user_id = get_jwt_identity()
        
        data = request.get_json()
        collection_id = data.get('collection_id')
        tag_id = data.get('tag_id')
        
        if not collection_id or not tag_id:
            return jsonify({"msg": "Collection or tag is missing."}), 400
        
        if is_my_collection_or_iam_adm(user_id, collection_id) == False:
            return jsonify({"msg": "You don't have permission to add tags to this collection."}), 400
        
        new_tag_collection = add_tag_in_collection(collection_id, tag_id)
        
        return jsonify({"msg": "Collection added successfully.", "tag_collection": object_to_dict(new_tag_collection) }), 201
    except Exception as e:
        return jsonify({"msg": "Error adding collection.", "error": str(e)}), 500
    
@tag_collection_blueprint.route('/separate', methods=['POST'])
@jwt_required()
def separate():
    try:
        user_id = get_jwt_identity()
        
        data = request.get_json()
        collection_id = data.get('collection_id')
        tag_id = data.get('tag_id')
        
        if not collection_id or not tag_id:
            return jsonify({"msg": "Collection or tag is missing."}), 400
        
        if is_my_collection_or_iam_adm(user_id, collection_id) == False:
            return jsonify({"msg": "You don't have permission to remove tags to this collection."}), 400
        
        tag_collection = remove_tag_in_collection(collection_id, tag_id)
        
        return jsonify({"msg": "Collection removed successfully.", "tag_collection": object_to_dict(tag_collection) }), 201
    except Exception as e:
        return jsonify({"msg": "Error removing collection.", "error": str(e)}), 500