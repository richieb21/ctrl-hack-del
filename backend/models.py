import bcrypt
from database import users_collection, user_profiles_collection
from bson import ObjectId
import datetime

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
        "linkedin_profile": linkedin,
        "github_profile": github,
        "phone_number": phone_number,
        "skills": {
            "language": [],
            "frameworks": [],
            "dev-tools": [],
            "other": []
        },
        "experiences": [],
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
def add_experience(user_id, job_title, date_range, job_description, skills):
    if not get_profile_by_user_id(user_id):
        print("Profile not found")
    
    new_experience = {
        "job_title": job_title,
        "date_range": date_range,
        "job_description": job_description,
        "skills": skills
    }

    user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$push": {"experiences": new_experience}}
    )

    return new_experience

def update_profile_skills(user_id, new_languages = [], new_frameworks = [], new_dev_tools = [], new_other_skills = []):
    profile = get_profile_by_user_id(user_id)
    if not profile:
        print("Profile not found.")
        return None

    languages = set(profile["skills"].get("language", [])).update(new_languages)
    frameworks = set(profile["skills"].get("frameworks", [])).update(new_frameworks)
    dev_tools = set(profile["skills"].get("dev-tools", [])).update(new_dev_tools)
    other = set(profile["skills"].get("other", [])).update(new_other_skills)

    updated_skills = {
        "language": list(languages),
        "frameworks": list(frameworks),
        "dev-tools": list(dev_tools),
        "other": list(other)
    }

    user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": {"skills": updated_skills}}
    )

    return updated_skills