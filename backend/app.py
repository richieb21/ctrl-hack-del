from flask import Flask, jsonify
from flask_cors import CORS
from auth import auth_bp
from profiles import profile_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Updated CORS configuration
CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(profile_bp, url_prefix='/user')

# Add a test endpoint
@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "API is working"}), 200

if __name__ == '__main__':
    app.run(debug=True)