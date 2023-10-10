from extensions import db


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=True)
    # Link to download the file
    ref = db.Column(db.String(300), nullable=False)

    # optional, mark files created by Artificial Intelligence
    is_ia = db.Column(db.Boolean, nullable=False, default=False)
    # optional, mark files with sensitive content
    sensitive_content = db.Column(db.Boolean, nullable=False, default=False)

    # Type of file (image, video, audio, text, etc)
    type = db.Column(db.String(150), nullable=False)

    # This source used if file is not uploaded to the server and is hosted in another place
    source = db.Column(db.String(580), nullable=True)

    # optional, used to multiple purposes, example, majory used to describe the file
    attr = db.Column(db.String(150), nullable=True)
    extra = db.Column(db.String(150), nullable=True)

    credits_id = db.Column(db.Integer, db.ForeignKey(
        'credits.id'), nullable=True)  # ondelete='CASCADE'
    collection_id = db.Column(db.Integer, db.ForeignKey(
        'collection.id'), nullable=False)

    tags = db.Column(db.String(580), nullable=True)
