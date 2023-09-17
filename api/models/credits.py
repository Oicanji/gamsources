from extensions import db

class Credits(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    expression = db.Column(db.String(300), nullable=False, default='Created by [1].')
    additional1 = db.Column(db.String(150), nullable=True)
    additional2 = db.Column(db.String(150), nullable=True)
    additional3 = db.Column(db.String(150), nullable=True)
    license = db.Column(db.String(150), nullable=False, default='CC BY 4.0')