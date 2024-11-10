# Example usage in your Flask route:
from models import get_profile_by_user_id
from flask import Blueprint, request, jsonify
import jwt
from functools import wraps
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId
from resume_builder import build_resume_from_profile
load_dotenv()

resume_bp = Blueprint('resume', __name__)
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

@resume_bp.route('/generate-resume', methods=['POST'])
@token_required
def generate_resume(user_id):
    try:
        # Get user profile
        profile_data = get_profile_by_user_id(user_id)
        if not profile_data:
            return jsonify({'message': 'Profile not found'}), 404

        # Build resume
        resume = build_resume_from_profile(profile_data)
        
        # Generate PDF
        latex_content = resume.toLatex()
        
        # You might want to save the PDF somewhere and return its URL
        return jsonify({
            'message': 'Resume generated successfully',
            'latex_content': latex_content
        })
    except Exception as e:
        print(f"Error generating resume: {str(e)}")
        return jsonify({'message': 'Failed to generate resume'}), 500