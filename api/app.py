
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('config')
CORS(app, origins="*")

    
@app.route('/')
def home():
    return ("Hello World!")

# Routes
from routes.router_user import user_blueprint  
from routes.router_collection import collection_blueprint
from routes.router_tag import tag_blueprint
from routes.router_tag_collection import tag_collection_blueprint
from routes.router_social import social_blueprint
from routes.router_social_media import social_media_blueprint
from routes.router_credits import credits_blueprint
from routes.router_item import item_blueprint
from routes.router_user_collection_votes import vote_blueprint

app.register_blueprint(user_blueprint, url_prefix='/user') 
app.register_blueprint(collection_blueprint, url_prefix='/collection')
app.register_blueprint(tag_collection_blueprint, url_prefix='/collection/tag')
app.register_blueprint(tag_blueprint, url_prefix='/tag')
app.register_blueprint(social_blueprint, url_prefix='/social')
app.register_blueprint(social_media_blueprint, url_prefix='/social_media')
app.register_blueprint(credits_blueprint, url_prefix='/credits')
app.register_blueprint(item_blueprint, url_prefix='/item')
app.register_blueprint(vote_blueprint, url_prefix='/vote')

import os

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['UPLOAD_FOLDER_IMAGES'], exist_ok=True)
os.makedirs(app.config['UPLOAD_FOLDER_AUDIO'], exist_ok=True)
os.makedirs(app.config['UPLOAD_FOLDER_TEXT'], exist_ok=True)