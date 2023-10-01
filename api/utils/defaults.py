from config import GENERATE_ADM
from models.social import Social
from models.user import User
from models.tag import Tag
from extensions import db

from werkzeug.security import generate_password_hash
from utils.console import console

from utils.generate import generate

class defaults:
    @staticmethod
    def create():
        console.log("Defaults method called")
        controller = defaults()
        console.log(GENERATE_ADM)
        if GENERATE_ADM == "true":
            controller.adm_default()
        controller.tag_default()
        controller.social_default()
        
    def adm_default(self):
        if User.query.filter_by(username='admin').first() is None:
            
            if open('api/.secret', 'r') is not None:
                secret = open('api/.secret', 'r')
            else:
                secret = open('api/.secret', 'w')
                secret.write('admin')
                secret.close()
                secret = open('api/.secret', 'r')
                
            password = secret.readline()
            hashed_password = generate_password_hash(password, method='scrypt')
            
            adm = User(username='admin', password=hashed_password, is_admin=True)
            
            db.session.add(adm)
            db.session.commit()
        else:
            if open('api/.secret', 'r') is not None:
                secret = open('api/.secret', 'r')
            else:
                secret = open('api/.secret', 'w')
                secret.write('admin')
                secret.close()
                secret = open('api/.secret', 'r')
                
            password = secret.readline()
            
            adm = User.query.filter_by(username='admin').first()
            hashed_password = generate_password_hash(password, method='scrypt')
            adm.password = hashed_password
            
            db.session.commit()
            db.session.close()
    
    def tag_default(self):
        if Tag.query.filter_by(name='2d').first() is None:
            if open('api/utils/defaults/tags.csv', 'r') is not None:
                tags = open('api/utils/defaults/tags.csv', 'r')
                tags = tags.readlines()
                tags.pop(0)
                
                for tag in tags:
                    if tag == '\n' or tag == '' or tag == ' ' or tag == '\r\n' or tag.startswith('#'):
                        continue
                    
                    tag = tag.split(';')
                    color = generate.hex()
                    
                    if len(tag) > 2:
                        color = tag[1]
                        
                    new_tag = Tag(name=tag[0], color=color)
                    
                    db.session.add(new_tag)
                    
                db.session.commit()
                db.session.close()
                console.log("Tags default created")
            else:
                console.warn("Tags.csv not found")
        else:
            console.log("Tags default already exists")    
            
    def social_default(self):
        if Social.query.filter_by(name='github').first() is None:
            if open('api/utils/defaults/social.csv', 'r') is not None:
                socials = open('api/utils/defaults/social.csv', 'r')
                
                socials = socials.readlines()
                socials.pop(0)
                
                for social in socials:
                    if social == '\n' or social == '' or social == ' ' or social == '\r\n' or social.startswith('#'):
                        continue
                    
                    social = social.split(';')
                    
                    new_social = Social(name=social[0], icon=social[1])
                    
                    db.session.add(new_social)
                
                db.session.commit()
                db.session.close()
                console.log("Social default created")
            else:
                console.warn("Social.csv not found")
        else:
            console.log("Social default already exists")    
    