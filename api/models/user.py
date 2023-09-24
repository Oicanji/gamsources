from extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(100), unique=True)
    image_url = db.Column(db.String(150), nullable=True, default='NULL')
    is_admin = db.Column(db.Boolean, nullable=False, default=False)