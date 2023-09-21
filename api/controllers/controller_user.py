from models.user import User
from utils.console import console
from utils.dict import object_to_dict


def is_admin(user_id):
    """
    Check if user is admin
    @param user_id: User id
    @return: True if user is admin, False if not
    """
    console.log('Check if admin method called')
    try:
        user = User.query.filter_by(id=user_id).first()
        if not user:
            raise Exception('User not found')
        print(user)
        print(object_to_dict(user))
        print(user.username)
        return user.is_admin
    except Exception as e:
        console.error(e)
        raise e