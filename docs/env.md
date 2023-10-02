# Operation of the Environment Variables System.

### If a .env file does not exist, the system will create a .env file with all default values.

### These are:
 - DEBUG = By default, TRUE, refers to the FLASK developer mode.
 
 - SECRET_KEY = By default, it is "cavalodefogo," essentially the encryption password used by Flask.
 
 - SQLALCHEMY_DATABASE_URI = By default, "sqlite:///gamsources.db," where the database will be stored.

 *(We have an API debugging file in [docs/], see more)*

 - BASE_URL = By default, it points to 127.0.0.1, the local IP where the script is running.

 - BASE_PORT = By default, it points to 5000, the output port. However, if something is already running on that port, it's a good idea to change it.

 - JWT_ACCESS_TOKEN_EXPIRES = By default, it is 3600, the value in seconds that the access token will expire, which is 1 hour by default.

 - JWT_REFRESH_TOKEN_EXPIRES = By default, it is 86400, the value in seconds that the refresh token will remain valid, which is 1 day by default.

 - GENERATE_ADM = The default value is "true," used to generate the default admin user or not. If you want to have more control over admin users, you can disable this option.