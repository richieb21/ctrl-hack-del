from flask import Flask, jsonify
from flask_cors import CORS
from auth import auth_bp
from profiles import profile_bp
from rank_resume import rank_bp
from resume import resume_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Update CORS configuration to handle credentials
CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:3000",
        "supports_credentials": True,
        "allow_headers": ["Content-Type", "Authorization"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
})

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(profile_bp, url_prefix='/user')
app.register_blueprint(rank_bp, url_prefix='/rank')
app.register_blueprint(resume_bp, url_prefix='/resume')

# Add a test endpoint
@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "API is working"}), 200

if __name__ == '__main__':
    app.run(debug=True)