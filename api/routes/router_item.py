from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers.controller_item import add_item, get_item, get_items, get_items_from_tags, get_items_from_user, get_items_in_collection, is_my_item_or_iam_adm, remove_item, update_item

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
    
@item_blueprint.route('/get', methods=['GET'])
def get():
    try:
        id_item = request.args.get('id')
        
        if not id_item:
            return jsonify({"msg": "Missing parameters."}), 400
        
        item = get_item(id_item)
        
        return jsonify({"msg": "Item retrieved successfully.", "item": item }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving item.", "error": str(e)}), 500
        

@item_blueprint.route('/all', methods=['GET'])
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
def get_by_user():
    try:
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)
        order_by = request.args.get('order_by', 'id')
        order = request.args.get('order', 'asc')
        
        user_id = request.args.get('user_id', None)
        
        if user_id is None:
            return jsonify({"msg": "Missing parameters."}), 400
        
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
        
        if 'tags_id' not in request.args:
            return jsonify({"msg": "Missing parameters."}), 400
        
        tags_id = request.args.get('tags_id')
        
        items = get_items_from_tags(tags_id, offset, limit, order_by, order)
        
        return jsonify({"msg": "Items retrieved successfully.", "items": list_object_to_dict(items) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving items.", "error": str(e)}), 500
    
@item_blueprint.route('/update', methods=['PUT'])
@jwt_required()
def update():
    try:
        user_id = get_jwt_identity()
        
        data = request.get_json()
        
        if 'id' not in data:
            return jsonify({"msg": "Missing parameters."}), 400
        
        item_id = data.get('id')
        
        if is_my_item_or_iam_adm(user_id, item_id) == False:
            return jsonify({"msg": "You don't have permission to add tags to this collection."}), 400
        
        name = data.get('name', None)
        ref = data.get('ref', None)
        is_ia = data.get('is_ia', None)
        type = data.get('type', None)
        source = data.get('source', None)
        attr = data.get('attr', None)
        extra = data.get('extra', None)
        credits_id = data.get('credits_id', None)
        
        res = update_item(item_id, name, ref, is_ia, type, source, attr, extra, credits_id)
        
        return jsonify({"msg": "Item updated successfully.", "item": object_to_dict(res) }), 200
    except Exception as e:
        return jsonify({"msg": "Error updating item.", "error": str(e)}), 500
    
@item_blueprint.route('/delete', methods=['DELETE'])
@jwt_required()
def delete():
    try:
        user_id = get_jwt_identity()

        item_id = request.args.get('id')
        
        if not item_id:
            return jsonify({"msg": "Missing parameters."}), 400
        
        if is_my_item_or_iam_adm(user_id, item_id) == False:
            return jsonify({"msg": "You don't have permission to add tags to this collection."}), 400
        
        res = remove_item(item_id)
        
        return jsonify({"msg": "Item deleted successfully.", "item": object_to_dict(res) }), 200
    except Exception as e:
        return jsonify({"msg": "Error deleting item.", "error": str(e)}), 500