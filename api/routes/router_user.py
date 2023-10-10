from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, jwt_required, get_jwt_identity, unset_jwt_cookies
from werkzeug.security import check_password_hash, generate_password_hash

from extensions import db, jwt
from models.user import User
from flask_jwt_extended import create_access_token

user_blueprint = Blueprint('user', __name__)

blocklist = set()


@user_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return jsonify({"msg": "Username, password or email is missing."}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"msg": "Nome de usuário já existe. Escolha outro."}), 400

    hashed_password = generate_password_hash(password, method='scrypt')

    new_user = User(username=username, password=hashed_password, email=email)

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=str(new_user.id))
    refresh_token = create_refresh_token(str(new_user.id))

    return jsonify(access_token=access_token, refresh_token=refresh_token, user={"id": new_user.id, "username": new_user.username, "email": new_user.email}), 201


@user_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = data.get('user')  # or email or username
    password = data.get('password')

    if not user or not password:
        return jsonify({"msg": "Username or password is missing."}), 400

    try:
        if '@' in user:
            user = User.query.filter_by(email=user).first()
        else:
            user = User.query.filter_by(username=user).first()

        if user and check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(user.id)

            return jsonify(access_token=access_token, refresh_token=refresh_token, is_admin=user.is_admin, user={"id": user.id, "username": user.username, "email": user.email}), 200
        else:
            return jsonify({"msg": "Bad username or password"}), 401
    except Exception as e:
        return jsonify({"msg": "Error logging in.", "error": str(e)}), 500


@user_blueprint.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)

    user = User.query.filter_by(id=identity).first()

    return jsonify(access_token=access_token, is_admin=user.is_admin, user={"id": user.id, "username": user.username, "email": user.email}), 200


@user_blueprint.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        token = get_jwt()
        jti = token['jti']
        blocklist.add(jti)
        unset_jwt_cookies

        return jsonify({"msg": "Successfully logged out"}), 200
    except Exception as e:
        return jsonify({"msg": "Error logging out.", "error": str(e)}), 500


@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(_, jwt_header):
    jti = jwt_header['jti']
    return jti in blocklist
