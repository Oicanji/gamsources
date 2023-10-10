from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers.controller_tag import add_tag, delete_tag, edit_tag, get_most_used_tags, get_tag, get_tags
from models.user import User

from utils.dict import list_object_to_dict, object_to_dict
from utils.generate import generate

tag_blueprint = Blueprint('tag', __name__)


@tag_blueprint.route('/add', methods=['POST'])
# @jwt_required()
def add():
    try:
        # user_id = get_jwt_identity()

        data = request.get_json()
        name = data.get('name')
        color = data.get('color', generate.hex())

        # apenas usuarios admin podem criar tags
        # user = User.query.filter_by(id=user_id).first()
        # if not user.is_admin:
        #     return jsonify({"msg": "You don't have permission to create tags."}), 400

        new_tag = add_tag(name, color)

        return jsonify({"msg": "Tag added successfully.", "tag": object_to_dict(new_tag)}), 201
    except Exception as e:
        return jsonify({"msg": "Error adding tag.", "error": str(e)}), 500


@tag_blueprint.route('/get', methods=['GET'])
def get():
    try:
        tag = get_tag(request.args.get('id'))

        return jsonify({"msg": "Tag retrieved successfully.", "tag": object_to_dict(tag)}), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving tag.", "error": str(e)}), 500


@tag_blueprint.route('/all', methods=['GET'])
def get_all():
    try:
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)

        tags = get_tags(limit, offset)

        return jsonify({"msg": "Tags retrieved successfully.", "tags": list_object_to_dict(tags)}), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving tags.", "error": str(e)}), 500


@tag_blueprint.route('/most', methods=['GET'])
def get_most():
    try:
        tags = get_most_used_tags()

        return jsonify({"msg": "Tags retrieved successfully.", "tags": list_object_to_dict(tags)}), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving tags.", "error": str(e)}), 500


@tag_blueprint.route('/update', methods=['PUT'])
@jwt_required()
def update():
    try:
        user_id = get_jwt_identity()

        # apenas usuarios admin podem criar tags
        user = User.query.filter_by(id=user_id).first()
        if not user.is_admin:
            return jsonify({"msg": "You don't have permission to edit tags."}), 400

        data = request.get_json()
        id = data.get('id')
        name = data.get('name')
        color = data.get('color')

        tag = edit_tag(id, color, name)

        return jsonify({"msg": "Tag edited successfully.", "tag": object_to_dict(tag)}), 200
    except Exception as e:
        return jsonify({"msg": "Error editing tag.", "error": str(e)}), 500


@tag_blueprint.route('/delete', methods=['DELETE'])
@jwt_required()
def delete():
    try:
        user_id = get_jwt_identity()

        # apenas usuarios admin podem criar tags
        user = User.query.filter_by(id=user_id).first()
        if not user.is_admin:
            return jsonify({"msg": "You don't have permission to delete tags."}), 400

        tag = delete_tag(request.args.get('id'))

        return jsonify({"msg": "Tag deleted successfully.", "tag": object_to_dict(tag)}), 200
    except Exception as e:
        return jsonify({"msg": "Error deleting tag.", "error": str(e)}), 500
