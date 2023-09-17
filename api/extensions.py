# To use the SQLAlchemy extension, we need to create an instance of it and then initialize it in the create_app function.
# For not recursive imports, we need to create a new file called extensions.py and put the following code in it:
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()