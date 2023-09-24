from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers.controller_item import add_item

from utils.dict import list_object_to_dict, object_to_dict

item_blueprint = Blueprint('item', __name__)

@item_blueprint.route('/add', methods=['POST'])
@jwt_required()
def add():
    try:
        data = request.get_json()
    
        user_id = get_jwt_identity()
        name = data['name']
        ref = data['ref']
        is_ia = data['is_ia']
        sensitive_content = data['sensitive_content']
        type = data['type']
        source = data['source']
        attr = data['attr']
        extra = data['extra']
        credits_id = data['credits_id']
        collection_id = data['collection_id']
        
        new_item = add_item(name, ref, is_ia, sensitive_content, type, source, attr, extra, credits_id, collection_id, user_id)
        
        return jsonify({"msg": "Item added successfully.", "item": object_to_dict(new_item) }), 201
    except Exception as e:
        return jsonify({"msg": "Error adding item.", "error": str(e)}), 500