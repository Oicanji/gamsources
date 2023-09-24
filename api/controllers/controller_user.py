from models.user import User
from utils.console import console
from utils.dict import object_to_dict


def is_admin(user_id):
    """
    Check if user is admin
    @param user_id: User id
    @return: True if user is admin, False if not
    """
    
    user = User.query.filter_by(id=user_id).first()
    if not user:
        raise Exception('User not found')
    return user.is_admin