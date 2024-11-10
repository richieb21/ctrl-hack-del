from flask import Blueprint, request, jsonify
import jwt
from functools import wraps
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId
from match import get_user_with_profile
load_dotenv()

rank_bp = Blueprint('rank', __name__)
SECRET_KEY = os.getenv('SECRET_KEY')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            if token.startswith('Bearer '):
                token = token.split(' ')[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_id = data['user_id']
        except:
            return jsonify({'message': 'Invalid token'}), 403
        return f(user_id, *args, **kwargs)
    return decorated

@rank_bp.route('/', methods=['GET'])
@token_required
def rank_resume(user_id):
    user = get_user_with_profile(user_id)
    print(user)
    return jsonify({'message': 'Resume ranked successfully'}), 200