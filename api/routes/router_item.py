from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from config import MAX_FILE_SIZE
from controllers.controller_item import add_item, get_item, get_items, get_items_from_tags, get_items_from_user, get_items_in_collection, is_my_item_or_iam_adm, remove_item, update_item

from utils.dict import list_object_to_dict, object_to_dict

item_blueprint = Blueprint('item', __name__)


@item_blueprint.route('/add', methods=['POST'])
@jwt_required()
def add():
    try:
        user_id = get_jwt_identity()

        type = request.form.get('type')
        collection_id = request.form.get('collection_id')
        
        ref = request.form.get('ref', None)
        file = request.files.get('file', None)

        if not type or not collection_id or (not ref and not file):
            return jsonify({"msg": "Missing parameters."}), 400

        name = request.form.get('name', None)
        
        source = request.form.get('source', None)
        attr = request.form.get('attr', None)
        extra = request.form.get('extra', None)

        credits_id = request.form.get('credits_id', None)

        is_ia = request.form.get('is_ia') == 'true'
        sensitive_content = request.form.get('sensitive_content') == 'true'

        # valides if file size
        if file.content_length > MAX_FILE_SIZE:
            return jsonify({"msg": "File too large. Max "+str(MAX_FILE_SIZE)+"mb."}), 400

        new_item = add_item(name, file, ref, is_ia, sensitive_content, type,
                            source, attr, extra, credits_id, collection_id, user_id)

        return jsonify({"msg": "Item added successfully.", "item": object_to_dict(new_item)}), 201
    except Exception as e:
        return jsonify({"msg": "Error adding item.", "error": str(e)}), 500


@item_blueprint.route('/get', methods=['GET'])
def get():
    try:
        id_item = request.args.get('id')

        if not id_item:
            return jsonify({"msg": "Missing parameters."}), 400

        item = get_item(id_item)

        return jsonify({"msg": "Item retrieved successfully.", "item": item}), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving item.", "error": str(e)}), 500


@item_blueprint.route('/all', methods=['GET'])
def get_all():
    try:
        offset = request.args.get('offset', 0)
        limit = request.args.get('limit', 25)
        order_by = request.args.get('order_by', 'id')
        order = request.args.get('order', 'asc')

        show_ia = int(request.args.get('show_ia', 0)) == 1
        show_sensitive = int(request.args.get('show_sensitive', 0)) == 1

        items = get_items(offset, limit, order_by,
                          order, show_ia, show_sensitive)

        return jsonify({"msg": "Items retrieved successfully.", "items": list_object_to_dict(items)}), 200
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

        items = get_items_in_collection(
            collection_id, offset, limit, order_by, order)

        return jsonify({"msg": "Items retrieved successfully.", "items": list_object_to_dict(items)}), 200
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

        return jsonify({"msg": "Items retrieved successfully.", "items": list_object_to_dict(items)}), 200
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

        show_ia = int(request.args.get('show_ia', 0)) == 1
        show_sensitive = int(request.args.get('show_sensitive', 0)) == 1

        items = get_items_from_tags(
            tags_id, offset, limit, order_by, order, show_ia, show_sensitive)

        return jsonify({"msg": "Items retrieved successfully.", "items": list_object_to_dict(items)}), 200
    except Exception as e:
        return jsonify({"msg": "Error retrieving items.", "error": str(e)}), 500


@item_blueprint.route('/update', methods=['PUT'])
@jwt_required()
def update():
    try:
        user_id = get_jwt_identity()


        item_id = request.form.get('id', None)
        
        if not item_id:
            return jsonify({"msg": "Missing parameters."}), 400

        if is_my_item_or_iam_adm(user_id, item_id) == False:
            return jsonify({"msg": "You don't have permission to add tags to this collection."}), 400

        name = request.form.get('name', None)
        ref = request.form.get('ref', None)
        type = request.form.get('type', None)
        source = request.form.get('source', None)
        attr = request.form.get('attr', None)
        extra = request.form.get('extra', None)
        credits_id = request.form.get('credits_id', None)
        
        is_ia = request.form.get('is_ia') == 'true'
        sensitive_content = request.form.get('sensitive_content') == 'true'
        
        file = request.files.get('file', None)
        
        # valides if file size
        if file.content_length > MAX_FILE_SIZE:
            return jsonify({"msg": "File too large. Max "+str(MAX_FILE_SIZE)+"mb."}), 400

        res = update_item(item_id, name, file, ref, is_ia, sensitive_content, type,
                          source, attr, extra, credits_id)

        return jsonify({"msg": "Item updated successfully.", "item": object_to_dict(res)}), 200
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

        return jsonify({"msg": "Item deleted successfully.", "item": object_to_dict(res)}), 200
    except Exception as e:
        return jsonify({"msg": "Error deleting item.", "error": str(e)}), 500
