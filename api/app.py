from flask import Flask, render_template
from flask_login import LoginManager
from config import BASE_PORT, BASE_URL

from extensions import db
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object('config')
db.init_app(app)
login_manager = LoginManager()
login_manager.login_view = 'user.login'
login_manager.init_app(app)

jwt = JWTManager(app)

from models.user import User

@login_manager.user_loader
def load_user(user_id):
    with app.app_context():
        return User.query.get(int(user_id))
    
@app.route('/')
def home():
    return render_template('pages/home.html', data={"BASE_URL": BASE_URL, "BASE_PORT": BASE_PORT})

# Routes
from routes.router_user import user_blueprint  
from routes.router_collection import collection_blueprint
from routes.router_tag import tag_blueprint
from routes.router_tag_collection import tag_collection_blueprint
from routes.router_social import social_blueprint
from routes.router_social_media import social_media_blueprint

app.register_blueprint(user_blueprint, url_prefix='/user') 
app.register_blueprint(collection_blueprint, url_prefix='/collection')
app.register_blueprint(tag_collection_blueprint, url_prefix='/collection/tag')
app.register_blueprint(tag_blueprint, url_prefix='/tag')
app.register_blueprint(social_blueprint, url_prefix='/social')
app.register_blueprint(social_media_blueprint, url_prefix='/social_media')

if __name__ == '__main__':
    with app.app_context():  # Entre no contexto da aplicação
        db.create_all()
    app.run(host=BASE_URL, port=BASE_PORT, debug=True)
