from extensions import db

class SocialMedia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String(150), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    social_id = db.Column(db.Integer, db.ForeignKey('social.id'), nullable=False)