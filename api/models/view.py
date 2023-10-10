from extensions import db


class View(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    collection_id = db.Column(db.Integer, db.ForeignKey(
        'collection.id'), nullable=False)
    current = db.Column(db.DateTime, nullable=False,
                        default=db.func.current_timestamp())
