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

# Importar o modelo de usuário
from models.user import User

@login_manager.user_loader
def load_user(user_id):
    with app.app_context():  # Entre no contexto da aplicação
        return User.query.get(int(user_id))
    
@app.route('/')
def home():
    return render_template('pages/home.html', data={"BASE_URL": BASE_URL, "BASE_PORT": BASE_PORT})

from routes.router_user import user_blueprint  # Importe o blueprint
app.register_blueprint(user_blueprint, url_prefix='/user')  # Registre o blueprint

if __name__ == '__main__':
    with app.app_context():  # Entre no contexto da aplicação
        db.create_all()
    app.run(host=BASE_URL, port=BASE_PORT, debug=True)
