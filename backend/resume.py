# Example usage in your Flask route:
from models import get_profile_by_user_id
from flask import Blueprint, jsonify, request
import jwt
from functools import wraps
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId
from resume_builder import build_resume_from_profile
from models import update_profile_education, update_profile_experiences, update_profile_projects, update_profile_skills, update_profile_extracurriculars
from flask import request, jsonify
import requests

load_dotenv()

resume_bp = Blueprint('resume', __name__)
SECRET_KEY = os.getenv('SECRET_KEY')

LATEX_COMPILER_URL = "https://latexonline.cc/compile"

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
        
        # Generate LaTeX
        latex_content = resume.toLatex()
        
        # Fix the LaTeX structure
        latex_content = latex_content.replace(
            r'\resumeSubHeadingListEnd\section{',
            r'\end{itemize}\section{'
        )
        
        # Ensure proper closing of environments
        if not latex_content.endswith(r'\end{document}'):
            latex_content = latex_content.rstrip() + r'\end{itemize}\end{document}'
        
        return jsonify({
            'message': 'Resume generated successfully',
            'latex_content': latex_content
        })
    except Exception as e:
        print(f"Error generating resume: {str(e)}")
        return jsonify({'message': 'Failed to generate resume'}), 500
    
@resume_bp.route('/compile-pdf', methods=['POST'])
def compile_pdf():
    try:
        latex_content = request.json.get('latex')
        if not latex_content:
            return jsonify({'error': 'No LaTeX content provided'}), 400

        # The URL that will serve the compiled PDF
        pdf_url = f"https://latexonline.cc/compile?text={requests.utils.quote(latex_content)}"

        return jsonify({
            'message': 'PDF compilation URL generated',
            'pdf': pdf_url
        })

    except Exception as e:
        print(f"Error generating PDF URL: {str(e)}")
        return jsonify({'error': 'Failed to generate PDF URL'}), 500
    
@resume_bp.route('/generate-resume-json', methods=['GET'])
@token_required
def generate_resume_json(user_id):
    try:
        profile_data = get_profile_by_user_id(user_id)
        resume = build_resume_from_profile(profile_data)

        resume_json = resume.toDict()
        return jsonify({
            'message': 'Resume generated successfully',
            'resume': resume_json
        })
    except Exception as e:
        print(f"Error generating resume: {str(e)}")
        return jsonify({'message': 'Failed to generate resume'}), 500

@resume_bp.route('/save-resume-order', methods=['POST'])
@token_required
def save_resume_order(user_id):
    try:
        data = request.get_json()
        sections = data.get('sections', [])
        
        # Update each section type based on the new order
        for section in sections:
            title = section.get('title')
            items = section.get('items', [])
            
            if title == "Education":
                formatted_items = [{
                    "schoolname": item.get('subTitle', ''),
                    "program": item.get('title', ''),
                    "start": item.get('timeFrom', ''),
                    "end": item.get('timeTo', ''),
                    "gpa": item.get('location', '').replace('GPA: ', '') if item.get('location', '').startswith('GPA: ') else ''
                } for item in items]
                update_profile_education(user_id, formatted_items)
                
            elif title == "Experience":
                formatted_items = [{
                    "title": item.get('title', ''),
                    "company": item.get('subTitle', ''),
                    "location": item.get('location', ''),
                    "date": f"{item.get('timeFrom', '')} - {item.get('timeTo', '')}",
                    "points": [point.get('text', '') for point in item.get('subPoints', [])]
                } for item in items]
                update_profile_experiences(user_id, formatted_items)
                
            elif title == "Projects":
                formatted_items = [{
                    "name": item.get('title', ''),
                    "date": item.get('timeFrom', ''),
                    "link": item.get('link', ''),
                    "description": [point.get('text', '') for point in item.get('subPoints', [])]
                } for item in items]
                update_profile_projects(user_id, formatted_items)
                
            elif title == "Skills":
                if items and len(items) > 0:
                    skills_item = items[0]  # Skills section typically has one item
                    categorized_skills = {
                        "language": skills_item.get('languages', []),
                        "framework": skills_item.get('frameworks', []),
                        "tool": skills_item.get('devTools', []),
                        "other": skills_item.get('other', [])
                    }
                    update_profile_skills(user_id, categorized_skills)
                    
            elif title == "Extracurriculars":
                formatted_items = [{
                    "title": item.get('title', ''),
                    "position": item.get('subTitle', ''),
                    "location": item.get('location', ''),
                    "date": f"{item.get('timeFrom', '')} - {item.get('timeTo', '')}",
                    "points": [point.get('text', '') for point in item.get('subPoints', [])]
                } for item in items]
                update_profile_extracurriculars(user_id, formatted_items)

        return jsonify({'message': 'Resume order saved successfully'})
    except Exception as e:
        print(f"Error saving resume order: {str(e)}")
        return jsonify({'message': 'Failed to save resume order'}), 500