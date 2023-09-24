from models.social import Social
from models.social_media import SocialMedia
from models.user import User
from utils.console import console
from extensions import db


def create_social_media(user_id, social_id, link):
    console.log('Create social media method called')
    
    social = Social.query.filter_by(id=social_id).first()
    if not social:
        raise Exception('Social not found')
    
    user = User.query.filter_by(id=user_id).first()
    if not user:
        raise Exception('User not found')
    
    new_social_media = SocialMedia(link=link, user_id=user_id, social_id=social_id)
    
    db.session.add(new_social_media)
    db.session.commit()
    
    return new_social_media
    
def get_social_media(user_id):
    console.log('Get social media method called')
        
    social_media = SocialMedia.query.filter_by(user_id=user_id).all()
    if not social_media:
        return 'Social media not found'
    
    return social_media
    
def edit_social_media(link, user_id):
    console.log('Edit social media method called')
        
    social_media = SocialMedia.query.filter_by(user_id=user_id).first()
    
    if not social_media:
        raise Exception('Social media not found')
    
    social_media.link = link
    
    db.session.commit()
    
    return social_media
    
def unlink_social_media(id, user_id):
    console.log('Unlink social media method called')
        
    social_media = SocialMedia.query.filter_by(id=id).first()
    if not social_media:
        raise Exception('Social media not found')
    
    user = User.query.filter_by(id=user_id).first()
    
    if user.is_admin == False:
        if user_id != social_media.user_id:
            raise Exception('You don\'t have permission to delete this social media')
        
    db.session.delete(social_media)
    db.session.commit()
    
    return social_media