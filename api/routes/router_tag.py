from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from controllers.controller_tag import add_tag, get_tag, get_tags

from utils.dict import list_object_to_dict, object_to_dict
from utils.generate import generate

tag_blueprint = Blueprint('tag', __name__)

@tag_blueprint.route('/add', methods=['POST'])
@jwt_required()
def add():
    try:
        data = request.get_json()
        name = data.get('name')
        color = data.get('color', generate.hex())
        
        new_tag = add_tag(name, color)
        
        return jsonify({"msg": "Tag added successfully.", "tag": object_to_dict(new_tag) }), 201
    except Exception as e:
        return jsonify({"msg": "Error adding tag.", "error": str(e)}), 500
        
@tag_blueprint.route('/get', methods=['GET'])
def get():
    try:
        tag = get_tag(request.args.get('id'))
        
        return jsonify({"msg": "Tag retrieved successfully.", "tag": object_to_dict(tag) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving tag.", "error": str(e)}), 500
    
@tag_blueprint.route('/all', methods=['GET'])
def get_all():
    try:
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)
        
        tags = get_tags(limit, offset)
        
        return jsonify({"msg": "Tags retrieved successfully.", "tags": list_object_to_dict(tags) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving tags.", "error": str(e)}), 500