from flask import Blueprint, jsonify, request
from controllers.controller_collection import add_collection, delete_collection, edit_collection, get_collection, get_collections, get_user_collections
from flask_jwt_extended import get_jwt_identity, jwt_required

from utils.dict import list_object_to_dict, object_to_dict

collection_blueprint = Blueprint('collection', __name__)

@collection_blueprint.route('/add', methods=['POST'])
@jwt_required()
def add():
    try:
        user_id = get_jwt_identity()
        
        new_collection = add_collection(user_id)
        
        return jsonify({"msg": "Collection added successfully.", "collection": object_to_dict(new_collection) }), 201
    except Exception as e:
        return jsonify({"msg": "Error adding collection.", "error": str(e)}), 500
    
@collection_blueprint.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    try:
    
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)
        
        user_id = get_jwt_identity()
        
        collections = get_user_collections(user_id, offset, limit)
        
        return jsonify({"msg": "Collections retrieved successfully.", "collections": list_object_to_dict(collections) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving collections.", "error": str(e)}), 500
    
@collection_blueprint.route('/', methods=['GET'])
def get():
    try:
        collection = get_collection(request.args.get('id'))
        
        return jsonify({"msg": "Collection retrieved successfully.", "collection": object_to_dict(collection) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving collection.", "error": str(e)}), 500
    
@collection_blueprint.route('/all', methods=['GET'])
def get_all():
    try:
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)
        order_by = request.args.get('order_by', 'id')
        order = request.args.get('order', 'asc')
        
        collections = get_collections(limit, offset, order_by, order)
        
        return jsonify({"msg": "Collections retrieved successfully.", "collections": list_object_to_dict(collections) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving collections.", "error": str(e)}), 500
    
@collection_blueprint.route('/update', methods=['PUT'])
@jwt_required()
def update():
    try:
        user_id = get_jwt_identity()
        
        data = request.get_json()
        
        edit_collection(data, user_id)
        
        return jsonify({"msg": "Collection updated successfully."}), 200
    except Exception as e:
        return jsonify({"msg": "Error updating collection.", "error": str(e)}), 500

@collection_blueprint.route('/delete', methods=['DELETE'])
@jwt_required()
def delete():
    try:
        user_id = get_jwt_identity()
        
        collection_id = request.args.get('id')
        
        delete_collection(collection_id, user_id)
        
        return jsonify({"msg": "Collection deleted successfully."}), 200
    except Exception as e:
        return jsonify({"msg": "Error deleting collection.", "error": str(e)}), 500