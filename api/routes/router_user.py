from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import login_user, logout_user
from routes.router_utils import render
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash

from extensions import db
from models.user import User
from flask_jwt_extended import create_access_token

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        
        if not username or not password or not email:
            return jsonify({"msg": "Username, password or email is missing."}), 400
    
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({"msg": "Nome de usuário já existe. Escolha outro."}), 400
        
        hashed_password = generate_password_hash(password, method='sha256')

        new_user = User(username=username, password=hashed_password, email=email)
        
        db.session.add(new_user)
        db.session.commit()
        
        login_user(new_user)
    
        access_token = create_access_token(identity=new_user.id)

        return jsonify({"access_token": access_token}), 201
    return render('register.html')

@user_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        user = data.get('user') #or email or username
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
                
                login_user(user)
                
                return jsonify(access_token=access_token), 200
            else:
                return jsonify({'Credenciais inválidas. Tente novamente.'}), 401
        except Exception as e:
            return jsonify({"msg": "Error logging in.", "error": str(e)}), 500
    return render('login.html')

@user_blueprint.route('/logout')
@jwt_required()
def logout():
    current_user_id = get_jwt_identity()
    print(current_user_id)
    logout_user()
    return redirect(url_for('user.register'))