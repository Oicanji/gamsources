from extensions import db

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=True)
    ref = db.Column(db.String(300), nullable=False)
    
    is_ia = db.Column(db.Boolean, nullable=False, default=False)
    sensitive_content = db.Column(db.Boolean, nullable=False, default=False)
    
    type = db.Column(db.String(150), nullable=False)
    
    source = db.Column(db.String(580), nullable=False)
    attr = db.Column(db.String(150), nullable=True)
    extra = db.Column(db.String(150), nullable=True)

    credits_id = db.Column(db.Integer, db.ForeignKey('credits.id'), nullable=True) #ondelete='CASCADE'
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)
    
    tags = db.Column(db.String(580), nullable=True)