from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers.controller_social import add_social, delete_social, edit_social
from controllers.controller_user import is_admin
from models.social import Social
from utils.dict import list_object_to_dict, object_to_dict

social_blueprint = Blueprint('social', __name__)

@social_blueprint.route('/add', methods=['POST'])
@jwt_required()
def add():
    try:
        user_id = get_jwt_identity()
        
        data = request.get_json()
        name = data.get('name')
        icon = data.get('icon')
        
        if not name or not icon:
            return jsonify({"msg": "Name or icon is missing."}), 400
        
        if is_admin(user_id) == False:
            return jsonify({"msg": "You don't have permission to add socials."}), 400
        
        new_social = add_social(name, icon)
        
        return jsonify({"msg": "Social added successfully.", "social": object_to_dict(new_social) }), 201
    except Exception as e:
        return jsonify({"msg": "Error adding social.", "error": str(e)}), 500
    
@social_blueprint.route('/edit', methods=['PUT'])
@jwt_required()
def edit():
    try:
        user_id = get_jwt_identity()
        
        data = request.get_json()
        id = data.get('id')
        name = data.get('name')
        icon = data.get('icon')
        
        if not id:
            return jsonify({"msg": "Id is missing."}), 400
        
        if is_admin(user_id) == False:
            return jsonify({"msg": "You don't have permission to edit socials."}), 400
        
        social = edit_social(id, name, icon)
        
        return jsonify({"msg": "Social edited successfully.", "social": object_to_dict(social) }), 201
    except Exception as e:
        return jsonify({"msg": "Error editing social.", "error": str(e)}), 500
    
@social_blueprint.route('/all', methods=['GET'])
def get_all():
    try:
        socials = Social.query.all()
        
        return jsonify({"msg": "Socials retrieved successfully.", "socials": list_object_to_dict(socials) }), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving socials.", "error": str(e)}), 500
    
    
@social_blueprint.route('/delete', methods=['DELETE'])
@jwt_required()
def delete():
    try:
        user_id = get_jwt_identity()
        
        id = request.args.get('id')
        
        if not id:
            return jsonify({"msg": "Id is missing."}), 400
        
        delete_social(id, user_id)
        
        return jsonify({"msg": "Social deleted successfully." }), 201
    except Exception as e:
        return jsonify({"msg": "Error deleting social.", "error": str(e)}), 500