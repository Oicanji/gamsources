from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers.controller_social_media import create_social_media, edit_social_media, get_social_media, unlink_social_media

from utils.dict import list_object_to_dict, object_to_dict

social_media_blueprint = Blueprint('social_media', __name__)

@social_media_blueprint.route('/add', methods=['POST'])
@jwt_required()
def add():
    try:
        user_id = get_jwt_identity()
        
        data = request.get_json()
        social_id = data.get('social_id')
        link = data.get('link')
        
        if not social_id or not link:
            return jsonify({"msg": "Social or link is missing."}), 400
        
        new_social_media = create_social_media(user_id, social_id, link)
        
        return jsonify({"msg": "Social media added successfully.", "social_media": object_to_dict(new_social_media) }), 201
    except Exception as e:
        return jsonify({"msg": "Error adding social media.", "error": str(e)}), 500
    
@social_media_blueprint.route('/get', methods=['GET'])
@jwt_required()
def get():
    try:
        id = request.args.get('id')
        
        if not id:
            return jsonify({"msg": "Id is missing."}), 400
        
        social_media = get_social_media(id)
        
        return jsonify({"msg": "Social media retrieved successfully.", "social_media": list_object_to_dict(social_media) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving social media.", "error": str(e)}), 500
    
@social_media_blueprint.route('/edit', methods=['PUT'])
@jwt_required()
def edit():
    try:
        user_id = get_jwt_identity()
        
        data = request.get_json()
        link = data.get('link')
        
        if not id:
            return jsonify({"msg": "Id is missing."}), 400
        
        social_media = edit_social_media(link, user_id)
        
        return jsonify({"msg": "Social media edited successfully.", "social_media": object_to_dict(social_media) }), 201
    except Exception as e:
        return jsonify({"msg": "Error editing social media.", "error": str(e)}), 500
    
@social_media_blueprint.route('/delete', methods=['DELETE'])
@jwt_required()
def delete():
    try:
        user_id = get_jwt_identity()
        
        id = request.args.get('id')
        
        if not id:
            return jsonify({"msg": "Id is missing."}), 400
        
        social_media = unlink_social_media(id, user_id)
        
        return jsonify({"msg": "Social media deleted successfully.", "social_media": object_to_dict(social_media) }), 201
    except Exception as e:
        return jsonify({"msg": "Error deleting social media.", "error": str(e)}), 500