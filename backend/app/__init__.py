from flask import Flask
import os
from flask_login import LoginManager

from .db import db

from .base import *

# from .auth import auth
# from .views import views

DB_NAME = "gamsources.db"

#os.getenv("SECRET_KEY")
__SECRET_KEY = "segredo"

app = Flask(__name__)

def create_app():

    @app.route("/")
    def hello_world():
        return "Hello, World!"

    app.config['SECRET_KEY'] = __SECRET_KEY
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # app.register_blueprint(auth, url_prefix='/login')

    # app.register_blueprint(views, url_prefix='/')

    with app.app_context():
        db.create_all()

    login_manager = LoginManager()

    login_manager.user_loader(lambda username: User.query.get(username))
    login_manager.init_app(app)

    return app