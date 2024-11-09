from flask import Blueprint, request, jsonify
from models import create_profile, get_profile_by_user_id, update_profile
import jwt
from functools import wraps
from dotenv import load_dotenv
import os

load_dotenv()

profile_bp = Blueprint('profile', __name__)
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
        except:
            return jsonify({'message': 'Invalid token'}), 403
        return f(user_id, *args, **kwargs)
    return decorated

@profile_bp.route('/profile', methods=['POST'])
@token_required
def create_or_update_profile(user_id):
    data = request.get_json()
    profile = get_profile_by_user_id(user_id)
    
    if profile:
        update_profile(user_id, data)
        return jsonify({'message': 'Profile updated successfully'})
    else:
        create_profile(
            user_id,
            data.get('linkedin_profile'),
            data.get('github_profile'),
            data.get('phone_number'),
            data.get('master_resume')
        )
        return jsonify({'message': 'Profile created successfully'})

@profile_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(user_id):
    profile = get_profile_by_user_id(user_id)
    if profile:
        profile['_id'] = str(profile['_id'])
        profile['user_id'] = str(profile['user_id'])
        return jsonify(profile)
    return jsonify({'message': 'Profile not found'}), 404
