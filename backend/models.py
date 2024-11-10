import bcrypt
from database import users_collection, user_profiles_collection
from bson import ObjectId
import datetime
import uuid

# Hash a password
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Check if a password matches a hashed password
def check_password(hashed_password, password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

# Create a user
def create_user(username, email, password):
    hashed_password = hash_password(password)
    
    user = {
        "username": username,
        "email": email,
        "password": hashed_password,
        "created_at": datetime.datetime.utcnow()
    }
    return users_collection.insert_one(user)

# Find a user by email
def find_user_by_email(email):
    return users_collection.find_one({"email": email})

# Find a user by id
def find_user_by_id(user_id):
    return users_collection.find_one({"_id": ObjectId(user_id)})

# Profile Model Functions

# Create a profile
def create_profile(user_id):
    profile = {
        "user_id": ObjectId(user_id),
        "name": "",
        "links": {
            "linkedin_profile": "",
            "github_profile": "",
            "email": "",
            "portfolio_link": "",
            "x_profile": ""
        },
        "skills": {
            "language": [],
            "framework": [],
            "tool": [],
            "other": []
        },
        "experiences": [
            {
                "title": "",
                "position": "",
                "location": "",
                "date": "",
                "points": []
            }
        ],
        "education": [
            {
                "schoolname": "",
                "level": "",
                "program": "",
                "start": "",
                "end": "",
                "gpa": "",
            }
        ],
        "projects": [
            {
                "name": "",
                "date": "",
                "description": [],
                "link": ""
            }
        ],
        "extra_curricular": [
            {
                "title": "",
                "position": "",
                "location": "",
                "date": "",
                "points": []
            }
        ],
        "awards": [
            {
                "title": "",
                "date": "",
                "description": ""
            }
        ],
        "generated_resumes": []
    }
    return user_profiles_collection.insert_one(profile)

# Get a profile by user id
def get_profile_by_user_id(user_id):
    profile = user_profiles_collection.find_one({"user_id": ObjectId(user_id)})
    if not profile:
        print("Profile not found.")
        return None
    return user_profiles_collection.find_one({"user_id": ObjectId(user_id)})

# Update a profile
def update_profile(user_id, update_data):
    if not get_profile_by_user_id(user_id):
        print("Profile not found")
    
    return user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": update_data}
    )

# Add a job experience to a profile
def add_experience(user_id, title, date, location, points, position):
    if not get_profile_by_user_id(user_id):
        print("Profile not found")
    
    new_experience = {
        "title": title,
        "date": date,
        "location": location,
        "position": position,
        "points": points
    }

    user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$push": {"experiences": new_experience}}
    )

    return new_experience

def update_profile_skills(user_id, categorized_skills):
    profile = get_profile_by_user_id(user_id)
    if not profile:
        print("Profile not found.")
        return None

    # Update each category separately
    for category in ["language", "framework", "tool", "other"]:
        user_profiles_collection.update_one(
            {"user_id": ObjectId(user_id)},
            {"$set": {f"skills.{category}": categorized_skills.get(category, [])}}
        )

    return categorized_skills

def update_profile_projects(user_id, projects):
    if not get_profile_by_user_id(user_id):
        print("Profile not found")
        return None
        
    # Ensure each project has the required fields
    formatted_projects = []
    for project in projects:
        formatted_project = {
            "name": project.get('name', ''),
            "date": project.get('date', ''),
            "description": project.get('description', []),
            "link": project.get('link', '')
        }
        formatted_projects.append(formatted_project)
    
    return user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": {"projects": formatted_projects}}
    )

def update_profile_links(user_id, data):
    if not get_profile_by_user_id(user_id):
        print("Profile not found")
        return None
    
    # Extract links from the nested structure
    links = data.get('links', {})
        
    # Create the update fields structure
    update_fields = {
        "links": {
            "linkedin_profile": links.get('linkedin', ''),
            "github_profile": links.get('github', ''),
            "email": links.get('email', ''),
            "portfolio_link": links.get('portfolio', ''),
            "x_profile": links.get('x', '')
        }
    }
    
    return user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": update_fields}
    )

def update_profile_name(user_id, name):
    user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": {"name": name}}
    )
    
def get_user_by_id(user_id):
    return users_collection.find_one({"_id": ObjectId(user_id)})

def update_profile_experiences(user_id, experiences):
    for experience in experiences:
        if 'id' not in experience:
            experience['id'] = str(uuid.uuid4())  # Assign ID if not present

        for point in experience.get('description', []):
            if isinstance(point, dict) and 'id' not in point:
                point['id'] = str(uuid.uuid4())

    # Update the profile in the database
    user_profiles_collection.update_one(
        {'user_id': user_id},
        {'$set': {'experiences': experiences}}
    )

def update_profile_extracurriculars(user_id, extracurriculars):
    if not get_profile_by_user_id(user_id):
        print("Profile not found")
        return None
        
    formatted_extracurriculars = []
    for extra in extracurriculars:
        formatted_extra = {
            "title": extra.get('title', ''),
            "position": extra.get('position', ''),
            "location": extra.get('location', ''),
            "date": extra.get('date', ''),
            "points": extra.get('points', [])
        }
        formatted_extracurriculars.append(formatted_extra)
    
    return user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": {"extra_curricular": formatted_extracurriculars}}
    )

def update_profile_awards(user_id, awards):
    if not get_profile_by_user_id(user_id):
        print("Profile not found")
        return None
        
    formatted_awards = []
    for award in awards:
        formatted_award = {
            "title": award.get('title', ''),
            "date": award.get('date', ''),
            "description": award.get('description', '')
        }
        formatted_awards.append(formatted_award)
    
    return user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": {"awards": formatted_awards}}
    )

def update_profile_education(user_id, education):
    if not get_profile_by_user_id(user_id):
        print("Profile not found")
        return None
        
    formatted_education = []
    for edu in education:
        formatted_edu = {
            "schoolname": edu.get('schoolname', ''),
            "level": edu.get('level', ''),
            "program": edu.get('program', ''),
            "start": edu.get('start', ''),
            "end": edu.get('end', ''),
            "gpa": edu.get('gpa', '')
        }
        formatted_education.append(formatted_edu)
    
    return user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": {"education": formatted_education}}
    )