from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers.controller_item import add_item, get_items, get_items_from_tags, get_items_from_user, get_items_in_collection

from utils.dict import list_object_to_dict, object_to_dict

item_blueprint = Blueprint('item', __name__)

@item_blueprint.route('/add', methods=['POST'])
@jwt_required()
def add():
    try:
        data = request.get_json()
        
        if 'ref' not in data or 'type' not in data or 'source' not in data or 'collection_id' not in data:
            return jsonify({"msg": "Missing parameters."}), 400
    
        user_id = get_jwt_identity()
        name = data['name'] if 'name' in data else None
        ref = data['ref']
        is_ia = data['is_ia'] if 'is_ia' in data else False
        sensitive_content = data['sensitive_content'] if 'sensitive_content' in data else False
        type = data['type']
        source = data['source']
        attr = data['attr'] if 'attr' in data else None
        extra = data['extra'] if 'extra' in data else None
        credits_id = data['credits_id'] if 'credits_id' in data else None
        collection_id = data['collection_id']
        
        new_item = add_item(name, ref, is_ia, sensitive_content, type, source, attr, extra, credits_id, collection_id, user_id)
        
        return jsonify({"msg": "Item added successfully.", "item": object_to_dict(new_item) }), 201
    except Exception as e:
        return jsonify({"msg": "Error adding item.", "error": str(e)}), 500
    
@item_blueprint.route('/all', methods=['GET'])
@jwt_required()
def get_all():
    try:
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)
        order_by = request.args.get('order_by', 'id')
        order = request.args.get('order', 'asc')
        
        items = get_items(offset, limit, order_by, order)
        
        return jsonify({"msg": "Items retrieved successfully.", "items": list_object_to_dict(items) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving items.", "error": str(e)}), 500
    
@item_blueprint.route('/get_by_collection', methods=['GET'])
@jwt_required()
def get_by_collection():
    try:
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)
        order_by = request.args.get('order_by', 'id')
        order = request.args.get('order', 'asc')
        
        if 'collection_id' not in request.args:
            return jsonify({"msg": "Missing parameters."}), 400
        
        collection_id = request.args.get('collection_id')
        
        items = get_items_in_collection(collection_id, offset, limit, order_by, order)
        
        return jsonify({"msg": "Items retrieved successfully.", "items": list_object_to_dict(items) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving items.", "error": str(e)}), 500
    
@item_blueprint.route('/get_by_user', methods=['GET'])
@jwt_required()
def get_by_user():
    try:
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)
        order_by = request.args.get('order_by', 'id')
        order = request.args.get('order', 'asc')
        
        user_id = get_jwt_identity()
        
        items = get_items_from_user(user_id, offset, limit, order_by, order)
        
        return jsonify({"msg": "Items retrieved successfully.", "items": list_object_to_dict(items) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving items.", "error": str(e)}), 500
    
@item_blueprint.route('/get_by_tags', methods=['GET'])
@jwt_required()
def get_by_tags():
    try:
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)
        order_by = request.args.get('order_by', 'id')
        order = request.args.get('order', 'asc')
        
        if 'tag_id' not in request.args:
            return jsonify({"msg": "Missing parameters."}), 400
        
        tags_id = request.args.get('tag_id')
        
        items = get_items_from_tags(tags_id, offset, limit, order_by, order)
        
        return jsonify({"msg": "Items retrieved successfully.", "items": list_object_to_dict(items) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving items.", "error": str(e)}), 500