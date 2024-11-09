from flask import Blueprint, request, jsonify
from models import create_user, find_user_by_email, check_password
import jwt
import datetime
from functools import wraps
from bson import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()

auth_bp = Blueprint('auth', __name__)
SECRET_KEY = os.getenv('SECRET_KEY')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_id = data['user_id']
        except Exception as e:
            return jsonify({'message': 'Invalid token!', 'error': str(e)}), 403
        return f(user_id, *args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password') or not data.get('email'):
        return jsonify({'message': 'Invalid data: Please provide username, password, and/or email'}), 400

    existing_user = find_user_by_email(data['email'])
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 409

    create_user(data['username'], data['email'], data['password'])
    return jsonify({'message': 'User registered successfully'})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = find_user_by_email(data.get('email'))

    if user and check_password(user['password'], data['password']):
        token = jwt.encode({
            'user_id': str(user['_id']),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm="HS256")
        return jsonify({'token': token})
    
    return jsonify({'message': 'Invalid credentials'}), 401
