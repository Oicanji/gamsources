from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from utils.dict import object_to_dict

from controllers.controller_credits import add_new_credits, get_credits, remove_credits, update_credits


credits_blueprint = Blueprint('credits', __name__)

@credits_blueprint.route('/add', methods=['POST'])
@jwt_required()
def add():
    try:
        data = request.get_json()
        
        expression = data['expression']
        add1 = data['add1']
        add2 = data['add2']
        add3 = data['add3']
        license = "CC BY" #data['license']
        
        new_credits = add_new_credits(expression, add1, add2, add3, license)
        
        return {"msg": "Credits added successfully.", "credits": object_to_dict(new_credits)}, 201
    except Exception as e:
        return {"msg": "Error adding credits.", "error": str(e)}, 500
    
@credits_blueprint.route('/get', methods=['GET'])
def get():
    try:
        credits = get_credits(request.args.get('id'))
        
        return {"msg": "Credits retrieved successfully.", "credits": object_to_dict(credits)}, 200
    except Exception as e:
        return {"msg": "Error retrieving credits.", "error": str(e)}, 500
    
@credits_blueprint.route('/update', methods=['PUT'])
@jwt_required()
def update():
    try:
        data = request.get_json()
        
        credits_id = data['id']
        expression = data['expression']
        add1 = data['add1']
        add2 = data['add2']
        add3 = data['add3']
        license = "CC BY" #data['license']
        
        credits = update_credits(credits_id, expression, add1, add2, add3, license)
        
        return {"msg": "Credits updated successfully.", "credits": object_to_dict(credits)}, 200
    except Exception as e:
        return {"msg": "Error updating credits.", "error": str(e)}, 500
    
@credits_blueprint.route('/delete', methods=['DELETE'])
@jwt_required()
def remove():
    try:
        credits = remove_credits(request.args.get('id'))
        
        return {"msg": "Credits removed successfully.", "credits": object_to_dict(credits)}, 200
    except Exception as e:
        return {"msg": "Error removing credits.", "error": str(e)}, 500