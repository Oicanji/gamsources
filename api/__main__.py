from config import BASE_PORT, BASE_URL
from app import app
from extensions import db

from utils.defaults import defaults

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
            
        # verify if default exists
        defaults.create()
    
    app.run(host=BASE_URL, port=BASE_PORT, debug=True)