from extensions import db

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    ref = db.Column(db.String(300), nullable=False)
    is_ia = db.Column(db.String(150), nullable=False, default='False')
    
    type = db.Column(db.String(150), nullable=False)
    
    source = db.Column(db.String(580), nullable=False)
    attr = db.Column(db.String(150), nullable=True)
    extra = db.Column(db.String(150), nullable=True)

    credits_id = db.Column(db.Integer, db.ForeignKey('credits.id'), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)