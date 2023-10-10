from sqlalchemy import func
from models.tag import Tag
from utils.console import console
from extensions import db
from models.tag_collection import TagCollection


def add_tag(name, color):
    console.log("Add tag method called")

    if Tag.query.filter_by(name=name).first() is not None:
        raise Exception("Tag already exists")

    new_tag = Tag(name=name, color=color)

    db.session.add(new_tag)
    db.session.commit()

    return new_tag


def get_tag(id):
    console.log("Get tag method called")

    tag = Tag.query.filter_by(id=id).first()

    db.session.commit()

    return tag


def get_tags(offset, limit):
    console.log("Get tags method called")

    tags = Tag.query.order_by(Tag.id).limit(offset).offset(limit).all()
    return tags


def get_most_used_tags():
    console.log("Get most used tags method called")

    subquery = db.session.query(
        TagCollection.tag_id,
        func.count().label('tag_count')
    ).group_by(TagCollection.tag_id).subquery()

    # Consulta principal para obter as 10 maiores tags com base na contagem
    top_tags = db.session.query(
        Tag
    ).join(subquery, Tag.id == subquery.c.tag_id)\
        .order_by(subquery.c.tag_count.desc())\
        .limit(10).all()

    return top_tags


def edit_tag(id, color, name):
    console.log("Edit tag method called")

    tag = Tag.query.filter_by(id=id).first()
    if tag is None:
        raise Exception("Tag not found")

    tag.color = color if color else tag.color
    tag.name = name if name else tag.name

    db.session.commit()

    return tag


def delete_tag(id):
    console.log("Delete tag method called")

    tag = Tag.query.filter_by(id=id).first()

    if tag is None:
        raise Exception("Tag not found")

    db.session.delete(tag)
    db.session.commit()

    return tag
