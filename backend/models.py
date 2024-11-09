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
def create_profile(user_id, linkedin, github, phone_number, master_resume):
    profile = {
        "user_id": ObjectId(user_id),
        "linkedin_profile": linkedin,
        "github_profile": github,
        "phone_number": phone_number,
        "master_resume": master_resume
    }
    return user_profiles_collection.insert_one(profile)

# Get a profile by user id
def get_profile_by_user_id(user_id):
    return user_profiles_collection.find_one({"user_id": ObjectId(user_id)})

# Update a profile
def update_profile(user_id, update_data):
    return user_profiles_collection.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": update_data}
    )
