def object_to_dict(obj):
    """ 
    Object SQLAlchemy to dict
    """
    obj_dict = {}
    for column in obj.__table__.columns:
        attribute_name = column.name
        attribute_value = getattr(obj, attribute_name)
        obj_dict[attribute_name] = attribute_value
    return obj_dict

def list_object_to_dict(list_obj):
    """ 
    List of objects SQLAlchemy to list of dict
    """
    list_obj_dict = []
    for obj in list_obj:
        obj_dict = object_to_dict(obj)
        list_obj_dict.append(obj_dict)
    return list_obj_dict