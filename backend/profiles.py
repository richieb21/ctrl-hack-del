from flask import Blueprint, request, jsonify
from models import get_profile_by_user_id, update_profile_skills, update_profile_projects, update_profile_links, update_profile_name, update_profile_experiences, update_profile_extracurriculars, update_profile_awards, update_profile_education
import jwt
from functools import wraps
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId

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
            if token.startswith('Bearer '):
                token = token.split(' ')[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_id = data['user_id']
        except:
            return jsonify({'message': 'Invalid token'}), 403
        return f(user_id, *args, **kwargs)
    return decorated

@profile_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(user_id):
    profile = get_profile_by_user_id(user_id)
    if profile:
        profile['_id'] = str(profile['_id'])
        profile['user_id'] = str(profile['user_id'])
        return jsonify(profile)
    return jsonify({'message': 'Profile not found'}), 404

@profile_bp.route('/skills', methods=['POST'])
@token_required
def update_skills(user_id):
    data = request.get_json()
    if not data.get('skills'):
        return jsonify({'message': 'Skills are required'}), 400
        
    # Initialize categorized skills
    categorized_skills = {
        "language": [],
        "framework": [],
        "tool": [],
        "other": []
    }
    
    # Sort skills into categories
    for skill in data['skills']:
        category = skill.get('category', 'other').lower()
        name = skill.get('name')
        
        if category in categorized_skills:
            categorized_skills[category].append(name)
        else:
            categorized_skills['other'].append(name)

    # Update the profile with categorized skills
    try:
        profile = get_profile_by_user_id(user_id)
        if not profile:
            return jsonify({'message': 'Profile not found'}), 404
            
        update_profile_skills(user_id, categorized_skills)
    
        return jsonify({'message': 'Skills updated successfully'})
    except Exception as e:
        print(f"Error updating skills: {str(e)}")
        return jsonify({'message': 'Failed to update skills'}), 500

@profile_bp.route('/projects', methods=['POST'])
@token_required
def update_projects(user_id):
    data = request.get_json()
    projects = data.get('projects', [])
    update_profile_projects(user_id, projects)
    return jsonify({'message': 'Projects updated successfully'})

@profile_bp.route('/links', methods=['POST'])
@token_required
def update_links(user_id):
    data = request.get_json()
    update_profile_links(user_id, data)
    return jsonify({'message': 'Links updated successfully'})

@profile_bp.route('/name', methods=['POST'])
@token_required
def update_name(user_id):
    data = request.get_json()
    name = data.get('name', '')
    update_profile_name(user_id, name)
    return jsonify({'message': 'Name updated successfully'})

@profile_bp.route('/experiences', methods=['POST'])
@token_required
def update_experiences(user_id):
    data = request.get_json()
    experiences = data.get('experiences', [])
    update_profile_experiences(user_id, experiences)
    return jsonify({'message': 'Experiences updated successfully'})

@profile_bp.route('/extracurriculars', methods=['POST'])
@token_required
def update_extracurriculars(user_id):
    data = request.get_json()
    extracurriculars = data.get('extracurriculars', [])
    update_profile_extracurriculars(user_id, extracurriculars)
    return jsonify({'message': 'Extracurriculars updated successfully'})

@profile_bp.route('/awards', methods=['POST'])
@token_required
def update_awards(user_id):
    data = request.get_json()
    awards = data.get('awards', [])
    update_profile_awards(user_id, awards)
    return jsonify({'message': 'Awards updated successfully'})

@profile_bp.route('/education', methods=['POST'])
@token_required
def update_education(user_id):
    data = request.get_json()
    education = data.get('education', [])
    update_profile_education(user_id, education)
    return jsonify({'message': 'Education updated successfully'})