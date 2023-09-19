from extensions import db

class Collection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    name = db.Column(db.String(150), nullable=True, default='')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    contains = db.Column(db.String(150), nullable=False, default='')
    view = db.Column(db.Integer, nullable=False, default=0)
    up_votes = db.Column(db.Integer, nullable=False, default=0)
    down_votes = db.Column(db.Integer, nullable=False, default=0)
