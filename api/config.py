import os
from dotenv import load_dotenv

# Env exists? If not, create it
if not os.path.exists("api/.env"):
    with open("api/.env", "w") as f:
        f.write("DEBUG=true\n")
        f.write("SECRET_KEY=cavalodefogo\n")
        f.write("SQLALCHEMY_DATABASE_URI=sqlite:///gamsources.db\n")
        f.write("BASE_URL=127.0.0.1\n")
        f.write("BASE_PORT=5050\n")
        f.write("JWT_ACCESS_TOKEN_EXPIRES=3600\n")
        f.write("JWT_REFRESH_TOKEN_EXPIRES=86400\n")
        f.write("GENERATE_ADM=true\n")
        f.write("MAX_ITEMS_IN_COLLECTION=50\n")
        f.write("UPLOAD_FOLDER=storage\n")
        f.write("UPLOAD_FOLDER_IMAGES=api/storage/images/\n")
        f.write("UPLOAD_FOLDER_AUDIO=api/storage/audio/\n")
        f.write("UPLOAD_FOLDER_TEXT=api/storage/text/\n")
        f.write("ALLOWED_IMAGE_EXTENSIONS=png,jpg,jpeg,gif\n")
        f.write("ALLOWED_AUDIO_EXTENSIONS=mp3,wav,ogg,flac\n")
        f.write("ALLOWED_TEXT_EXTENSIONS=txt,pdf,js,php\n")
        f.write("MAX_FILE_SIZE=30\n")
        
# Load the .env file
load_dotenv()

# if you don't have some of the parameters in the env
DEBUG = os.getenv("DEBUG", "true")
SECRET_KEY = os.getenv("SECRET_KEY", "cavalodefogo")
SQLALCHEMY_DATABASE_URI = os.getenv(
    "SQLALCHEMY_DATABASE_URI", "sqlite:///gamsources.db")
BASE_URL = os.getenv("BASE_URL", "127.0.0.1")
BASE_PORT = int(os.getenv("BASE_PORT", 5050))
JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600))
JWT_REFRESH_TOKEN_EXPIRES = int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES", 86400))
GENERATE_ADM = os.getenv("GENERATE_ADM", "true")
MAX_ITEMS_IN_COLLECTION = int(os.getenv("MAX_ITEMS_IN_COLLECTION", 50))

UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "storage")

UPLOAD_FOLDER_IMAGES = os.getenv("UPLOAD_FOLDER_IMAGES", "api/storage/images/")
UPLOAD_FOLDER_AUDIO = os.getenv("UPLOAD_FOLDER_AUDIO", "api/storage/audio/")
UPLOAD_FOLDER_TEXT = os.getenv("UPLOAD_FOLDER_TEXT", "api/storage/text/")

ALLOWED_IMAGE_EXTENSIONS = os.getenv(
    "ALLOWED_IMAGE_EXTENSIONS", "png,jpg,jpeg,gif").split(",")
ALLOWED_AUDIO_EXTENSIONS = os.getenv(
    "ALLOWED_AUDIO_EXTENSIONS", "mp3,wav,ogg,flac").split(",")
ALLOWED_TEXT_EXTENSIONS =  os.getenv(
    "ALLOWED_TEXT_EXTENSIONS", "txt,pdf,js,php").split(",")

MAX_FILE_SIZE = 32 * 1024 * 1024  # 32MB
