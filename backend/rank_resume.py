from flask import Blueprint, request, jsonify
import jwt
from functools import wraps
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId
from match import get_user_with_profile, get_rankings, resumeGenerate, get_user_object
from data_models.user import User
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

@rank_bp.route('/jobmatch', methods=['POST'])
@token_required
def job_match(user_id):
    data = request.get_json()
    job_description = data.get('jobDescription')
    
    if not job_description:
        return jsonify({'error': 'Job description is required'}), 400
        
    try:
        # Get rankings using the job description
        rankings = get_rankings(user_id, job_description)
        
        # Format the response
        response = {
            'matches': [{
                'type': rank['type'],
                'title': rank['title'],
                'score': round(rank['score'], 2),
                'subtitle': rank.get('subtitle', ''),
                'date': rank.get('date', ''),
                'location': rank.get('location', ''),
                'content': rank.get('content', ''),
                'index': rank['index']  # Add the index to the response
            } for rank in rankings]
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        print(f"Error in job matching: {str(e)}")
        return jsonify({'error': 'Failed to process job matching'}), 500

@rank_bp.route('/generate-resume', methods=['POST'])
@token_required
def generate_resume(user_id):
    data = request.get_json()
    matches = data.get('matches')
    
    if not matches:
        return jsonify({'error': 'Matches are required'}), 400
        
    try:
        # Get user object
        user = get_user_object(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        # Generate resume using matches and user data
        resume = resumeGenerate(matches, user)
        
        # Generate LaTeX content
        latex_content = resume.toLatex()
        
        return jsonify({
            'latex': latex_content
        }), 200
        
    except Exception as e:
        print(f"Error generating resume: {str(e)}")
        return jsonify({'error': 'Failed to generate resume'}), 500