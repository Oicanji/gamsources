import os
from dotenv import load_dotenv

# Env exists? If not, create it
if not os.path.exists(".env"):
    with open(".env", "w") as f:
        f.write("DEBUG=true\n")
        f.write("SECRET_KEY=cavalodefogo\n")
        f.write("SQLALCHEMY_DATABASE_URI=sqlite:///gamsources.db\n")
        f.write("API_ONLY_MODE=false\n")
        f.write("BASE_URL=127.0.0.1\n")
        f.write("BASE_PORT=5000\n")

# Load the .env file
load_dotenv()

# if you don't have some of the parameters in the env
DEBUG = os.getenv("DEBUG", "true")
SECRET_KEY = os.getenv("SECRET_KEY", "cavalodefogo")
SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI", "sqlite:///gamsources.db")
API_ONLY_MODE = os.getenv("API_ONLY_MODE", "false")
BASE_URL = os.getenv("BASE_URL", "127.0.0.1")
BASE_PORT = int(os.getenv("BASE_PORT", 5000))