from flask import Flask
from auth import auth_bp
from profiles import profile_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(profile_bp, url_prefix='/user')

if __name__ == '__main__':
    app.run(debug=True)
